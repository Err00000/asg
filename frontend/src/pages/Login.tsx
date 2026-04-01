import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore, Language } from '../store/useStore';
import { Mail, Lock, ArrowRight, LogIn } from 'lucide-react';

const authLanguages: { code: Language; label: string; flag: string }[] = [
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'ro', label: 'RO', flag: '🇷🇴' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'it', label: 'IT', flag: '🇮🇹' },
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
  { code: 'ar', label: 'AR', flag: '🇸🇦' },
  { code: 'tr', label: 'TR', flag: '🇹🇷' },
];

export function Login() {
  const { t, setToken, language, setLanguage } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        navigate('/');
      } else {
        setError(data.error || 'auth.auth_failed');
      }
    } catch (err) {
      setError('auth.conn_error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="max-w-md w-full">
        {/* Language Selector */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
            {t('language_select')}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {authLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 transition-all font-bold text-xs ${
                  language === lang.code
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md scale-110'
                    : 'border-white bg-white text-slate-400 hover:border-slate-200 hover:text-slate-600'
                }`}
              >
                <span className="text-base leading-none">{lang.flag}</span>
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl mb-6">
                <LogIn size={40} />
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                {t('nav.login')}
              </h1>
              <p className="text-slate-500 font-medium">
                {t('auth.login_subtitle')}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold rounded-2xl animate-in fade-in slide-in-from-top-2">
                {error === 'auth.auth_failed' ? t('auth.auth_failed') : error === 'auth.conn_error' ? t('auth.conn_error') : error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                  {t('auth.username')} / {t('auth.email')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder={t('auth.email_placeholder')}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder={t('auth.password_placeholder')}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm pt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-slate-500 group-hover:text-slate-700 transition-colors">{t('auth.remember_me')}</span>
                </label>
                <Link to="#" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
                  {t('auth.forgot_password')}
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-black text-lg rounded-2xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                {isLoading ? t('auth.loading_login') : t('nav.login')}
                {!isLoading && <ArrowRight size={20} />}
              </button>
            </form>
          </div>
          
          <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 text-center">
            <p className="text-slate-500 font-medium">
              {t('auth.no_account')}{' '}
              <Link to="/register" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
                {t('nav.register')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
