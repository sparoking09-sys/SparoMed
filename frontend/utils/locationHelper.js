// مساعد الموقع والمسافات

import * as Location from 'expo-location';

// طلب صلاحية الموقع
export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('خطأ في طلب صلاحية الموقع:', error);
    return false;
  }
};

// الحصول على الموقع الحالي
export const getCurrentLocation = async () => {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return null;
    
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation
    });
    
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      accuracy: location.coords.accuracy,
      altitude: location.coords.altitude
    };
  } catch (error) {
    console.error('خطأ في الحصول على الموقع:', error);
    return null;
  }
};

// الاستماع لتغييرات الموقع
export const watchLocation = async (callback, options = {}) => {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return null;
    
    const subscription = await Location.watchPositionAsync(
      {
        accuracy: options.accuracy || Location.Accuracy.BestForNavigation,
        timeInterval: options.timeInterval || 10000,
        distanceInterval: options.distanceInterval || 50
      },
      (location) => {
        callback({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          accuracy: location.coords.accuracy
        });
      }
    );
    
    return subscription;
  } catch (error) {
    console.error('خطأ في مراقبة الموقع:', error);
    return null;
  }
};

// حساب المسافة بين نقطتين (Haversine Formula)
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // نصف قطر الأرض بالكيلومتر
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return {
    km: parseFloat(distance.toFixed(2)),
    m: parseInt(distance * 1000),
    miles: parseFloat((distance * 0.621371).toFixed(2))
  };
};

// الحصول على عنوان من الإحداثيات (Reverse Geocoding)
export const getAddressFromCoordinates = async (latitude, longitude) => {
  try {
    const addresses = await Location.reverseGeocodeAsync({
      latitude,
      longitude
    });
    
    if (addresses.length > 0) {
      const address = addresses[0];
      return {
        street: address.street || '',
        city: address.city || '',
        region: address.region || '',
        country: address.country || '',
        postalCode: address.postalCode || '',
        fullAddress: `${address.street || ''} ${address.city || ''} ${address.region || ''}`
      };
    }
    return null;
  } catch (error) {
    console.error('خطأ في الحصول على العنوان:', error);
    return null;
  }
};
