import i18n from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

// const currentLanguage = window.location.search.split('=')[1];
const currentLanguage =
  navigator.languages && navigator.languages.length ? navigator.languages[0] : 'zh';

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // 检测用户语言
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: currentLanguage,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // react不需要，因为默认情况下它会转义
    },
    partialBundledLanguages: true,
    backend: {
      // 获取VITE_PUBLIC_PATH，用于拼接后端请求地址
      loadPath: `${import.meta.env.VITE_PUBLIC_PATH}/locales/{{lng}}/{{ns}}.json`,
    },
  });

// i18n.services.formatter.add('DD/MM/YY', (value, lng, options) => {
//   return dayjs(value).format('DD/MM/YY');
// });

// i18n.services.formatter.add('YYYY-MM-DD', (value, lng, options) => {
//   return dayjs(value).format('YYYY-MM-DD');
// });

export default i18n;
