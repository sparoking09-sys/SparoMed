// Main App Component (React Native)
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { getCurrentUser } from './backend/services/authService';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MapScreen from './screens/MapScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // التحقق من وجود مستخدم مسجل دخول
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userData, type) => {
    setUser(userData);
    setUserType(type);
  };

  const handleSignupSuccess = (userData) => {
    setUser(userData);
    // سيتم إعادة التوجيه إلى صفحة اختيار نوع المستخدم
  };

  const handleLogout = () => {
    setUser(null);
    setUserType(null);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        {user ? (
          // شاشات التطبيق الرئيسية (بعد تسجيل الدخول)
          <Stack.Screen
            name="Map"
            options={{ title: 'الخريطة' }}
          >
            {(props) => (
              <MapScreen
                {...props}
                userId={user.uid}
                userType={userType}
              />
            )}
          </Stack.Screen>
        ) : (
          // شاشات المصادقة (قبل تسجيل الدخول)
          <>
            <Stack.Screen
              name="Login"
              options={{ title: 'تسجيل الدخول' }}
            >
              {(props) => (
                <LoginScreen
                  {...props}
                  onLoginSuccess={handleLoginSuccess}
                />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="Signup"
              options={{ title: 'إنشاء حساب' }}
            >
              {(props) => (
                <SignupScreen
                  {...props}
                  onSignupSuccess={handleSignupSuccess}
                />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;