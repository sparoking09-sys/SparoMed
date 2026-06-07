// Service Request Management Service
import { db } from '../firebase-config';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';

// إنشاء طلب خدمة جديد
export const createServiceRequest = async (patientId, serviceData) => {
  try {
    const requestRef = collection(db, 'serviceRequests');
    const docRef = await addDoc(requestRef, {
      patientId: patientId,
      serviceType: serviceData.serviceType,
      location: {
        latitude: serviceData.latitude,
        longitude: serviceData.longitude,
        address: serviceData.address
      },
      description: serviceData.description || '',
      status: 'pending', // pending, accepted, in_progress, completed, cancelled
      urgency: serviceData.urgency || 'normal', // low, normal, high, urgent
      createdAt: Timestamp.now(),
      estimatedTime: serviceData.estimatedTime || null,
      assignedNurseId: null,
      notes: []
    });
    
    return {
      id: docRef.id,
      ...serviceData,
      status: 'pending'
    };
  } catch (error) {
    throw new Error(`خطأ في إنشاء الطلب: ${error.message}`);
  }
};

// قبول الطلب من قبل الممرض
export const acceptRequest = async (requestId, nurseId) => {
  try {
    const requestRef = doc(db, 'serviceRequests', requestId);
    await updateDoc(requestRef, {
      status: 'accepted',
      assignedNurseId: nurseId,
      acceptedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    throw new Error(`خطأ في قبول الطلب: ${error.message}`);
  }
};

// رفض الطلب
export const rejectRequest = async (requestId, nurseId, reason) => {
  try {
    const requestRef = doc(db, 'serviceRequests', requestId);
    await updateDoc(requestRef, {
      status: 'rejected',
      rejectedBy: nurseId,
      rejectionReason: reason,
      rejectedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    throw new Error(`خطأ في رفض الطلب: ${error.message}`);
  }
};

// تحديث حالة الطلب
export const updateRequestStatus = async (requestId, newStatus) => {
  try {
    const requestRef = doc(db, 'serviceRequests', requestId);
    const updateData = {
      status: newStatus,
      updatedAt: Timestamp.now()
    };
    
    if (newStatus === 'completed') {
      updateData.completedAt = Timestamp.now();
    }
    
    await updateDoc(requestRef, updateData);
    return true;
  } catch (error) {
    throw new Error(`خطأ في تحديث حالة الطلب: ${error.message}`);
  }
};

// الحصول على الطلبات الخاصة بالمريض
export const getPatientRequests = async (patientId) => {
  try {
    const requestsRef = collection(db, 'serviceRequests');
    const q = query(requestsRef, where('patientId', '==', patientId));
    const snapshot = await getDocs(q);
    
    const requests = [];
    snapshot.forEach((doc) => {
      requests.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return requests;
  } catch (error) {
    throw new Error(`خطأ في جلب الطلبات: ${error.message}`);
  }
};

// الاستماع لطلبات جديدة (للممرض)
export const listenToNurseRequests = (nurseId, callback) => {
  const requestsRef = collection(db, 'serviceRequests');
  const q = query(
    requestsRef,
    where('status', '==', 'pending'),
    where('urgency', '!=', null)
  );
  
  return onSnapshot(q, (snapshot) => {
    const requests = [];
    snapshot.forEach((doc) => {
      requests.push({
        id: doc.id,
        ...doc.data()
      });
    });
    callback(requests);
  });
};

// إضافة ملاحظة على الطلب
export const addRequestNote = async (requestId, nurseId, note) => {
  try {
    const requestRef = doc(db, 'serviceRequests', requestId);
    const noteData = {
      nurseId: nurseId,
      text: note,
      timestamp: Timestamp.now()
    };
    
    // إضافة الملاحظة إلى مصفوفة الملاحظات
    // هذا يتطلب Firebase extension أو serverless function
    await updateDoc(requestRef, {
      notes: [...(await getDocs(requestRef)).data().notes || [], noteData]
    });
    
    return true;
  } catch (error) {
    throw new Error(`خطأ في إضافة الملاحظة: ${error.message}`);
  }
};