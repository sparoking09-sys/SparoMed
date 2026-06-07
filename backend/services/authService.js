// Authentication Service
import { auth } from '../firebase-config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';

// تسجيل مستخدم جديد
export const registerUser = async (email, password, displayName, userType) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // تحديث البيانات الشخصية
    await updateProfile(user, {
      displayName: displayName
    });

    return {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      userType: userType // 'patient' أو 'nurse'
    };
  } catch (error) {
    throw new Error(`خطأ في التسجيل: ${error.message}`);
  }
};

// تسجيل الدخول
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName
    };
  } catch (error) {
    throw new Error(`خطأ في تسجيل الدخول: ${error.message}`);
  }
};

// تسجيل الخروج
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    throw new Error(`خطأ في تسجيل الخروج: ${error.message}`);
  }
};

// الحصول على المستخدم الحالي
export const getCurrentUser = () => {
  return auth.currentUser;
};