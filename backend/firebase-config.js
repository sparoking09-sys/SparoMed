// Firebase Configuration for SparoMed
// استخدام بيانات تجريبية للاختبار المحلي

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Firebase Configuration - Demo/Testing
// لتغيير إلى بيانات حقيقية، استبدل هذه القيم ببيانات مشروعك من Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDemoKey123456789012345678901234567", // Demo Key
  authDomain: "sparomed-demo.firebaseapp.com",
  projectId: "sparomed-demo-12345",
  storageBucket: "sparomed-demo-12345.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcd",
  databaseURL: "https://sparomed-demo-12345.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);
export const storage = getStorage(app);

// تسجيل الاتصال
console.log('Firebase initialized with config:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain
});

export default app;