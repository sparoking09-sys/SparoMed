// Location and Maps Service
import { db, realtimeDb } from '../firebase-config';
import { ref, update, onValue, get, child } from 'firebase/database';
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

// تحديث موقع الممرض
export const updateNurseLocation = async (nurseId, latitude, longitude) => {
  try {
    const locationRef = ref(realtimeDb, `nurses/${nurseId}/location`);
    await update(locationRef, {
      latitude: latitude,
      longitude: longitude,
      timestamp: new Date().getTime()
    });
    return true;
  } catch (error) {
    throw new Error(`خطأ في تحديث الموقع: ${error.message}`);
  }
};

// الحصول على موقع الممرض
export const getNurseLocation = async (nurseId) => {
  try {
    const snapshot = await get(child(ref(realtimeDb), `nurses/${nurseId}/location`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  } catch (error) {
    throw new Error(`خطأ في الحصول على الموقع: ${error.message}`);
  }
};

// الاستماع لتغييرات الموقع في الوقت الحقيقي
export const listenToNurseLocation = (nurseId, callback) => {
  const locationRef = ref(realtimeDb, `nurses/${nurseId}/location`);
  onValue(locationRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    }
  });
};

// حساب المسافة بين نقطتين (بالكيلومتر)
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // نصف قطر الأرض بالكيلومتر
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// العثور على الممرضين القريبين
export const findNearbyNurses = async (latitude, longitude, radiusKm = 5) => {
  try {
    const nursesRef = collection(db, 'nurses');
    const q = query(nursesRef, where('available', '==', true));
    const snapshot = await getDocs(q);
    
    const nearbyNurses = [];
    snapshot.forEach((doc) => {
      const nurse = doc.data();
      if (nurse.location) {
        const distance = calculateDistance(
          latitude,
          longitude,
          nurse.location.latitude,
          nurse.location.longitude
        );
        if (distance <= radiusKm) {
          nearbyNurses.push({
            id: doc.id,
            ...nurse,
            distance: distance
          });
        }
      }
    });
    
    return nearbyNurses.sort((a, b) => a.distance - b.distance);
  } catch (error) {
    throw new Error(`خطأ في البحث عن ممرضين قريبين: ${error.message}`);
  }
};