import { createContext, useContext } from "react";
import translations from "./translations";

const LanguageContext = createContext();

export const useTranslation = () => {
  const { lang, setLang } = useContext(LanguageContext);
  
  const t = (key) => {
    const currentTranslations = translations[lang] || translations.en;
    
    return currentTranslations[key] || key;
  };
  
  const changeLanguage = (newLang) => {
    if (newLang in translations) {
      setLang(newLang);
      
      document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
      
      document.body.classList.remove("lang-ar", "lang-en");
      document.body.classList.add(`lang-${newLang}`);
    }
  };
  
  return {
    t,                
    changeLanguage,   
    currentLang: lang 
  };
};

export default LanguageContext;