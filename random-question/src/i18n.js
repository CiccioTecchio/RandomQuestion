import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationIT from './locales/it/translation.json';
import translationEN from './locales/en/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  it: {
    translation: translationIT,
  },
 };
 

i18n
  // Enables the hook initialization module
  .use (initReactI18next)
  .init({
    // Standard language used
    fallbackLng: 'it',
    debug: false,
    resources,
    //Detects and caches a cookie from the language provided
    detection: {
      order: ['queryString', 'cookie'],
      cache: ['cookie']
    },
    interpolation: {
      escapeValue: false
    }
  })

export default i18n;