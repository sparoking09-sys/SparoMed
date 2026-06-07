// Hook لإدارة المصادقة

import { useState, useEffect } from 'react';
import { getCurrentUser, loginUser, logoutUser } from '@services/authService';
import { handleError } from '@utils/errorHandler';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // التحقق من وجود مستخدم عند تحميل التطبيق
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser || null);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await loginUser(email, password);
      setUser(userData);
      return userData;
    } catch (err) {
      const { errorMessage } = handleError(err, 'login');
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await logoutUser();
      setUser(null);
    } catch (err) {
      const { errorMessage } = handleError(err, 'logout');
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user
  };
};
