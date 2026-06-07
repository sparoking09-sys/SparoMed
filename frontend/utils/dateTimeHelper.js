// مساعد التاريخ والوقت

// تنسيق التاريخ
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

// تنسيق الوقت
export const formatTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

// تنسيق التاريخ والوقت معاً
export const formatDateTime = (date) => {
  return `${formatDate(date)} ${formatTime(date)}`;
};

// الحصول على الفرق الزمني بالدقائق
export const getTimeDifferenceInMinutes = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.floor((d2 - d1) / (1000 * 60));
};

// الحصول على الفرق الزمني بصيغة مقروءة
export const getReadableTimeDifference = (date) => {
  const now = new Date();
  const diff = getTimeDifferenceInMinutes(date, now);
  
  if (diff < 1) return 'الآن';
  if (diff < 60) return `${diff} دقيقة`;
  if (diff < 1440) return `${Math.floor(diff / 60)} ساعة`;
  return `${Math.floor(diff / 1440)} يوم`;
};
