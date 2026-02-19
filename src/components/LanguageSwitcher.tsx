import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'he' ? 'en' : 'he';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="absolute top-4 left-4 flex items-center gap-1 text-gray-500 hover:text-[#00bf63] transition-colors duration-200 cursor-pointer"
    >
      <Languages size={20} />
      <span className="text-sm">{i18n.language === 'he' ? 'EN' : 'עב'}</span>
    </button>
  );
}
