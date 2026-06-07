// خادم معالجة الأخطاء

export const handleError = (error, context = '') => {
  console.error(`[Error in ${context}]:`, error);
  
  let errorMessage = 'حدث خطأ غير متوقع';
  let errorCode = 'UNKNOWN_ERROR';
  
  // معالجة أخطاء Firebase
  if (error.code) {
    errorCode = error.code;
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'المستخدم غير موجود';
        break;
      case 'auth/wrong-password':
        errorMessage = 'كلمة المرور غير صحيحة';
        break;
      case 'auth/email-already-in-use':
        errorMessage = 'البريد الإلكتروني مستخدم بالفعل';
        break;
      case 'auth/weak-password':
        errorMessage = 'كلمة المرور ضعيفة جداً';
        break;
      case 'auth/invalid-email':
        errorMessage = 'البريد الإلكتروني غير صحيح';
        break;
      case 'permission-denied':
        errorMessage = 'لا توجد صلاحيات كافية';
        break;
      default:
        errorMessage = error.message || errorMessage;
    }
  }
  
  return {
    errorMessage,
    errorCode,
    originalError: error
  };
};

export const logError = (error, context = '') => {
  const { errorMessage, errorCode } = handleError(error, context);
  console.error(`[${errorCode}] ${context}: ${errorMessage}`);
};
