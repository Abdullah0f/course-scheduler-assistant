export const FILE_MSGS = {
  SUMMARY: {
    SUCCESS: 'نجاح',
    ERROR: 'خطأ'
  },
  SUCCESS: 'تم رفع الملف بنجاح',
  ERROR: 'حدث خطأ أثناء رفع الملف',
  READ_ERROR: 'حدث خطأ أثناء قراءة الملف',
  NO_FILE: 'الرجاء اختيار ملف',
  FILE_TYPE: 'الرجاء رفع ملفات من نوع html',
  FILE_SIZE: 'الرجاء رفع ملفات أقل من 3 ميغابايت'
}

const errorCodeTranslations = {
  'auth/email-already-in-use': 'البريد الإلكتروني المُدخل مُستخدم بالفعل من قِبل مُستخدم آخر',
  'auth/invalid-email': 'البريد الإلكتروني المُدخل غير صحيح. يجب أن يكون عبارة عن عنوان بريد إلكتروني صالح',
  'auth/weak-password': 'كلمة المرور غير صالحة يجب أن تتكون من سلسلة أحرف أو أرقام لا تقل عن ست خانات',
  'auth/invalid-login-credentials': 'البريد الإلكتروني أو كلمة المرور المُدخلة غير صحيحة',
  'auth/unverified-email': 'لم تقم بعد بتأكيد بريدك الإلكتروني. يرجى التحقق من بريدك الوارد وتأكيد بريدك الإلكتروني',
  'auth/missing-password': 'الرجاء إدخال كلمة المرور',
  'default': 'حدث خطأ. يرجى المحاولة مرة أخرى.'
}

export const translateErrorCode = (errorCode) => {
  return errorCodeTranslations[errorCode] || errorCodeTranslations['default']
}

