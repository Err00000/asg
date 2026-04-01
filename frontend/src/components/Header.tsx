import { Link } from 'react-router-dom';
import { Globe, Menu } from 'lucide-react';
import { useStore, Language } from '../store/useStore';
import { useState } from 'react';
import logo from '../logo.png';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ro', label: 'Română', flag: '🇷🇴' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
];

export function Header() {
  const { language, setLanguage, t, token, logout, setContactModalOpen } = useStore();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentLang = languages.find(l => l.code === language) || languages[0];

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setContactModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl overflow-hidden shadow-lg group-hover:shadow-blue-900/20 transition-all">
              <img src={logo} alt="Auto Solution Group Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-blue-900 leading-tight tracking-tight">AUTO SOLUTION</span>
              <span className="text-xl font-bold text-slate-800 leading-tight tracking-tight">GROUP</span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase mt-0.5">Finanzierung • Versicherung • Zulassung</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-semibold text-slate-600 hover:text-blue-900 uppercase tracking-wider transition-colors">{t('nav.home')}</Link>
            <a href="/#services" className="text-sm font-semibold text-slate-600 hover:text-blue-900 uppercase tracking-wider transition-colors">{t('nav.services')}</a>
            <a href="#contact" onClick={handleContactClick} className="text-sm font-semibold text-slate-600 hover:text-blue-900 uppercase tracking-wider transition-colors cursor-pointer">{t('nav.contact')}</a>
            
            <div className="h-4 w-px bg-slate-200"></div>
            
            {token ? (
              <>
                <Link to="/account" className="text-sm font-semibold text-blue-600 hover:text-blue-900 uppercase tracking-wider transition-colors">{t('nav.account')}</Link>
                <button 
                  onClick={() => logout()}
                  className="text-sm font-semibold text-slate-600 hover:text-rose-600 uppercase tracking-wider transition-colors"
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-900 uppercase tracking-wider transition-colors">{t('nav.login')}</Link>
                <Link to="/register" className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold uppercase tracking-wider hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
                  {t('nav.register')}
                </Link>
              </>
            )}
            
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-blue-900 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 transition-colors"
              >
                <Globe size={16} />
                <span className="uppercase">{currentLang.code}</span>
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-slate-50 transition-colors ${language === lang.code ? 'text-blue-900 font-semibold bg-blue-50/50' : 'text-slate-600'}`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-4">
          <Link to="/" className="block text-sm font-semibold text-slate-600 uppercase tracking-wider" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.home')}</Link>
          <a href="/#services" className="block text-sm font-semibold text-slate-600 uppercase tracking-wider" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.services')}</a>
          <a href="#contact" className="block text-sm font-semibold text-slate-600 uppercase tracking-wider cursor-pointer" onClick={handleContactClick}>{t('nav.contact')}</a>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {token ? (
              <>
                <Link 
                  to="/account" 
                  className="flex items-center justify-center py-2.5 px-4 rounded-xl border border-slate-200 text-sm font-bold text-blue-600 uppercase tracking-wider"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.account')}
                </Link>
                <button 
                  className="flex items-center justify-center py-2.5 px-4 rounded-xl bg-slate-100 text-rose-600 text-sm font-bold uppercase tracking-wider"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="flex items-center justify-center py-2.5 px-4 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 uppercase tracking-wider"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.login')}
                </Link>
                <Link 
                  to="/register" 
                  className="flex items-center justify-center py-2.5 px-4 rounded-xl bg-blue-600 text-white text-sm font-bold uppercase tracking-wider"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.register')}
                </Link>
              </>
            )}
          </div>
          
          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-3">Select Language</p>
            <div className="grid grid-cols-2 gap-2">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2 rounded-lg text-sm border ${language === lang.code ? 'border-blue-200 bg-blue-50 text-blue-900 font-medium' : 'border-slate-100 text-slate-600'}`}
                >
                  <span>{lang.flag}</span>
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}