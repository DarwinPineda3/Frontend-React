import 'react-i18next';

// Import the translation JSON files or define their shape
import translationEn from './locales/en/translation.json';
import translationEs from './locales/es/translation.json';

// Define the default resources type
declare module 'react-i18next' {
  interface Resources {
    translation: typeof translationEn;
  }
}
