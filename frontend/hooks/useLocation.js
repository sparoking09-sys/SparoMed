// Hook لإدارة الموقع

import { useState, useEffect, useRef } from 'react';
import {
  getCurrentLocation,
  watchLocation,
  calculateDistance
} from '@utils/locationHelper';
import { handleError } from '@utils/errorHandler';

export const useLocation = (options = {}) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const watchSubscription = useRef(null);

  // الحصول على الموقع الأول
  useEffect(() => {
    const initLocation = async () => {
      try {
        setLoading(true);
        const currentLoc = await getCurrentLocation();
        setLocation(currentLoc);
        setError(null);
        
        // بدء المراقبة المستمرة
        if (options.watch !== false) {
          watchSubscription.current = await watchLocation(
            (newLoc) => {
              setLocation(newLoc);
            },
            options.watchOptions
          );
        }
      } catch (err) {
        const { errorMessage } = handleError(err, 'useLocation');
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    initLocation();

    return () => {
      if (watchSubscription.current) {
        watchSubscription.current.remove();
      }
    };
  }, [options.watch]);

  const getDistanceTo = (latitude, longitude) => {
    if (!location) return null;
    return calculateDistance(
      location.latitude,
      location.longitude,
      latitude,
      longitude
    );
  };

  return {
    location,
    loading,
    error,
    getDistanceTo
  };
};
