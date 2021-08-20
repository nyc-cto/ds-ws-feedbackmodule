import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { TRANSLATIONS_EN } from "./translations/en/translation";
import { TRANSLATIONS_ES } from "./translations/es/translation";
import { TRANSLATIONS_AR } from "./translations/ar/translation";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      en: {
        translation: TRANSLATIONS_EN,
      },
      es: {
        translation: TRANSLATIONS_ES,
      },
      ar: {
        translation: TRANSLATIONS_AR,
      },
    },
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    returnObjects: true,
  });

export default i18n;
