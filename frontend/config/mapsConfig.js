// Google Maps Configuration
// استخدام Demo Key للاختبار

export const GOOGLE_MAPS_API_KEY = "AIzaSyDemoGoogleMapsKey123456789012345"; // Demo Key للاختبار

// إذا كنت تريد استخدام مفتاح حقيقي:
// 1. اذهب إلى: https://console.cloud.google.com
// 2. أنشئ مشروع جديد أو استخدم مشروع موجود
// 3. فعل "Maps SDK for Android" و "Maps SDK for iOS"
// 4. أنشئ API Key جديد من "Credentials"
// 5. استبدل GOOGLE_MAPS_API_KEY بالمفتاح الحقيقي

// إعدادات خيارات الخريطة
export const MAP_CONFIG = {
  initialRegion: {
    latitude: 36.7372,    // المدية، الجزائر
    longitude: 2.6589,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  },
  searchRadius: 5, // كيلومتر
  updateInterval: 10000, // 10 ثوان
  distanceThreshold: 50 // 50 متر
};

export default {
  GOOGLE_MAPS_API_KEY,
  MAP_CONFIG
};