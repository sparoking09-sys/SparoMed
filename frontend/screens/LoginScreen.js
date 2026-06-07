// Login Screen Component (React Native)
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView
} from 'react-native';
import { loginUser } from '../../backend/services/authService';

const LoginScreen = ({ navigation, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('patient'); // 'patient' or 'nurse'

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('خطأ', 'الرجاء ملء جميع الحقول');
      return;
    }

    setLoading(true);
    try {
      const user = await loginUser(email, password);
      onLoginSuccess(user, userType);
    } catch (error) {
      Alert.alert('خطأ في تسجيل الدخول', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SparoMed</Text>
        <Text style={styles.subtitle}>خدمة التمريض المنزلي</Text>
      </View>

      {/* اختيار نوع المستخدم */}
      <View style={styles.userTypeContainer}>
        <TouchableOpacity
          style={[
            styles.userTypeButton,
            userType === 'patient' && styles.userTypeButtonActive
          ]}
          onPress={() => setUserType('patient')}
        >
          <Text
            style={[
              styles.userTypeText,
              userType === 'patient' && styles.userTypeTextActive
            ]}
          >
            مريض
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.userTypeButton,
            userType === 'nurse' && styles.userTypeButtonActive
          ]}
          onPress={() => setUserType('nurse')}
        >
          <Text
            style={[
              styles.userTypeText,
              userType === 'nurse' && styles.userTypeTextActive
            ]}
          >
            ممرضة
          </Text>
        </TouchableOpacity>
      </View>

      {/* نموذج تسجيل الدخول */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="البريد الإلكتروني"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={!loading}
        />
        <TextInput
          style={styles.input}
          placeholder="كلمة المرور"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
            <Button
              title="تسجيل الدخول"
              onPress={handleLogin}
              color="#007AFF"
            />
          )}
        </View>
      </View>

      {/* رابط التسجيل */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>ليس لديك حساب؟ </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupLink}>إنشاء حساب جديد</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  header: {
    alignItems: 'center',
    marginBottom: 40
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF'
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5
  },
  userTypeContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 10
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#ddd'
  },
  userTypeButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF'
  },
  userTypeText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#666'
  },
  userTypeTextActive: {
    color: '#fff'
  },
  form: {
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 14,
    textAlign: 'right'
  },
  buttonContainer: {
    marginTop: 20
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signupText: {
    fontSize: 14,
    color: '#666'
  },
  signupLink: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600'
  }
});

export default LoginScreen;