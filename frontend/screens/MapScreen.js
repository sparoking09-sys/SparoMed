// Map Screen Component (React Native)
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Text,
  ActivityIndicator,
  Alert
} from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { updateNurseLocation, findNearbyNurses } from '../../backend/services/locationService';

const MapScreen = ({ userId, userType }) => {
  const [location, setLocation] = useState(null);
  const [nearbyNurses, setNearbyNurses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapRef, setMapRef] = useState(null);

  // طلب صلاحية الموقع
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('خطأ', 'نحتاج إلى صلاحية الوصول للموقع');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      setLoading(false);

      // إذا كان ممرضاً، تحديث الموقع في الوقت الحقيقي
      if (userType === 'nurse') {
        startLocationTracking(currentLocation.coords);
      } else {
        // إذا كان مريضاً، البحث عن ممرضين قريبين
        searchNearbyNurses(currentLocation.coords);
      }
    })();
  }, []);

  // تتبع الموقع المستمر للممرضة
  const startLocationTracking = async (initialLocation) => {
    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 10000, // كل 10 ثواني
        distanceInterval: 50 // أو كل 50 متر
      },
      async (newLocation) => {
        setLocation(newLocation.coords);
        // تحديث الموقع في Firebase
        try {
          await updateNurseLocation(
            userId,
            newLocation.coords.latitude,
            newLocation.coords.longitude
          );
        } catch (error) {
          console.error('خطأ في تحديث الموقع:', error);
        }
      }
    );
  };

  // البحث عن ممرضين قريبين
  const searchNearbyNurses = async (patientLocation) => {
    try {
      const nurses = await findNearbyNurses(
        patientLocation.latitude,
        patientLocation.longitude,
        5 // البحث ضمن 5 كيلومترات
      );
      setNearbyNurses(nurses);
    } catch (error) {
      Alert.alert('خطأ', 'فشل البحث عن ممرضين قريبين');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>لم نتمكن من الحصول على الموقع</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={setMapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {/* موقع المستخدم الحالي */}
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude
          }}
          title={userType === 'nurse' ? 'موقعك' : 'عنوانك'}
          pinColor={userType === 'nurse' ? 'blue' : 'red'}
        />

        {/* دائرة نطاق البحث (للمريض) */}
        {userType === 'patient' && (
          <Circle
            center={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
            radius={5000} // 5 كيلومتر
            strokeColor="rgba(0, 150, 255, 0.5)"
            fillColor="rgba(0, 150, 255, 0.1)"
          />
        )}

        {/* عرض الممرضين القريبين */}
        {nearbyNurses.map((nurse) => (
          <Marker
            key={nurse.id}
            coordinate={{
              latitude: nurse.location.latitude,
              longitude: nurse.location.longitude
            }}
            title={nurse.name}
            description={`المسافة: ${nurse.distance.toFixed(2)} كم`}
            pinColor="green"
          />
        ))}
      </MapView>

      {/* معلومات إضافية */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          {userType === 'patient'
            ? `وجدنا ${nearbyNurses.length} ممرضة قريبة`
            : 'الموقع يتحدث في الوقت الحقيقي'}
        </Text>
        <Button
          title="تحديث الموقع"
          onPress={() => searchNearbyNurses(location)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    width: '100%',
    height: '85%'
  },
  infoContainer: {
    width: '100%',
    height: '15%',
    padding: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoText: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center'
  }
});

export default MapScreen;