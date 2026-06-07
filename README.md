# SparoMed - تطبيق خدمة التمريض المنزلي

## 📱 نظرة عامة
تطبيق جزائري لربط المرضى مع الممرضات المتخصصات في الخدمات الصحية المنزلية باستخدام نظام الخرائط والموقع الفعلي.

## ✨ المميزات الرئيسية

### للمريض:
- 🔐 تسجيل دخول آمن
- 📍 طلب خدمة تمريض مع تحديد الموقع
- 🗺️ عرض الممرضات القريبات على الخريطة
- 📊 متابعة حالة الطلب في الوقت الفعلي
- ⭐ تقييم الممرضة بعد انتهاء الخدمة

### للممرضة:
- 🔐 تسجيل دخول آمن
- 🗺️ تتبع موقعها على الخريطة في الوقت الفعلي
- 📢 تلقي إشعارات الطلبات القريبة
- ✅ قبول أو رفض الطلبات
- 📝 تسجيل ملاحظات على الخدمة

## 🛠️ التقنيات المستخدمة

### Frontend:
- **React Native** - لتطبيق الموبايل
- **React Navigation** - للتنقل بين الشاشات
- **Expo** - لتطوير وتشغيل التطبيق
- **react-native-maps** - لدعم الخرائط
- **expo-location** - للحصول على موقع المستخدم

### Backend:
- **Firebase** - للمصادقة وقاعدة البيانات
- **Firestore** - لتخزين بيانات الطلبات والمستخدمين
- **Realtime Database** - لتحديث الموقع في الوقت الفعلي
- **Firebase Storage** - لتخزين الصور والملفات

### Maps & Location:
- **Google Maps API** - لعرض الخرائط والموقع
- **Geolocation** - لحساب المسافة والاتجاهات

## 📂 هيكل المشروع

```
SparoMed/
├── backend/
│   ├── firebase-config.js
│   └── services/
│       ├── authService.js        # خدمات المصادقة
│       ├── locationService.js    # خدمات الموقع والخرائط
│       └── requestService.js     # خدمات الطلبات
├── frontend/
│   ├── App.js                    # التطبيق الرئيسي
│   └── screens/
│       ├── LoginScreen.js        # شاشة تسجيل الدخول
│       ├── SignupScreen.js       # شاشة إنشاء حساب
│       └── MapScreen.js          # شاشة الخريطة
└── README.md
```

## 🚀 البدء السريع

### المتطلبات:
- Node.js و npm
- Expo CLI
- Firebase Project
- Google Maps API Key

### التثبيت:

1. استنساخ المشروع:
```bash
git clone https://github.com/Sparoking09/SparoMed.git
cd SparoMed
```

2. تثبيت المكتبات:
```bash
npm install
```

3. تثبيت Expo:
```bash
npm install -g expo-cli
```

4. إعداد Firebase:
- أنشئ مشروع في Firebase Console
- انسخ بيانات الاتصال إلى `backend/firebase-config.js`

5. إضافة Google Maps API Key:
- احصل على مفتاح من Google Cloud Console
- أضفه إلى `frontend/screens/MapScreen.js`

6. تشغيل التطبيق:
```bash
expo start
```

## 📋 خريطة الطريق

- [x] إعداد Firebase
- [x] خدمات المصادقة
- [x] خدمات الموقع والخرائط
- [x] خدمات الطلبات
- [ ] شاشة تتبع الطلب المتقدمة
- [ ] نظام التقييمات والمراجعات
- [ ] نظام الدفع
- [ ] الإشعارات الفعلية (Push Notifications)
- [ ] لوحة الإدارة

## 🤝 المساهمة

نرحب بالمساهمات! يرجى:
1. عمل Fork للمشروع
2. إنشاء فرع للميزة الجديدة
3. Commit التغييرات
4. Push الفرع
5. فتح Pull Request

## 📝 الترخيص

MIT License - شاهد LICENSE.md للمزيد

## 📞 التواصل

- البريد الإلكتروني: sparoking09@gmail.com
- GitHub: [@Sparoking09](https://github.com/Sparoking09)

---

**تم الإنشاء بـ ❤️ في المدية، الجزائر**
