import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Initialize i18next with backend and language detector
i18n
  .use(Backend) // Load translations from local JSON files
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    fallbackLng: 'en', // Fallback language if detected language is not available
    debug: false, // Set to true for debugging

    interpolation: {
      escapeValue: false, // React already handles escaping for XSS
    },
    ns: ['translation'], // Namespace for translations
    defaultNS: 'translation',
    react: {
      useSuspense: false, // Disable suspense mode for avoiding loading issues
    },
  });

export default i18n;
