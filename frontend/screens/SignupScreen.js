// Signup Screen Component (React Native)
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
import { registerUser } from '../../backend/services/authService';

const SignupScreen = ({ navigation, onSignupSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('patient');

  const handleSignup = async () => {
    // التحقق من الحقول
    if (!email || !password || !fullName || !phone) {
      Alert.alert('خطأ', 'الرجاء ملء جميع الحقول');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('خطأ', 'كلمات المرور غير متطابقة');
      return;
    }

    if (password.length < 6) {
      Alert.alert('خطأ', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    setLoading(true);
    try {
      const user = await registerUser(email, password, fullName, userType);
      // حفظ بيانات إضافية (Phone, etc.)
      // يمكن إضافة ذلك في Firestore
      onSignupSuccess(user);
    } catch (error) {
      Alert.alert('خطأ في التسجيل', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>إنشاء حساب جديد</Text>
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

      {/* نموذج التسجيل */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="الاسم الكامل"
          value={fullName}
          onChangeText={setFullName}
          editable={!loading}
        />
        <TextInput
          style={styles.input}
          placeholder="رقم الهاتف"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          editable={!loading}
        />
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
        <TextInput
          style={styles.input}
          placeholder="تأكيد كلمة المرور"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          editable={!loading}
        />

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
            <Button
              title="إنشاء الحساب"
              onPress={handleSignup}
              color="#007AFF"
            />
          )}
        </View>
      </View>

      {/* رابط تسجيل الدخول */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>لديك حساب بالفعل؟ </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>تسجيل الدخول</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF'
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginText: {
    fontSize: 14,
    color: '#666'
  },
  loginLink: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600'
  }
});

export default SignupScreen;