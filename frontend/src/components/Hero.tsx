import { useStore } from '../store/useStore';
import { ArrowRight, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import headerImage from '../header.jpg';

export function Hero() {
  const { t, setContactModalOpen, token } = useStore();
  const navigate = useNavigate();

  const handleCTA = () => {
    if (token) {
      setContactModalOpen(true);
    } else {
      navigate('/login');
    }
  };

  return (
    <section className="relative bg-slate-900 min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={headerImage}
          alt="Car Dealership"
          className="w-full h-full object-cover object-center opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            {t('hero.subtitle')}
          </p>
          
          <button 
            onClick={handleCTA}
            className="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg px-8 py-4 rounded-full transition-all hover:shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
          >
            {token ? (
              <>
                {t('hero.cta')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                {t('hero.login_to_contact')}
                </>
                )}          </button>
        </div>
      </div>
    </section>
  );
}
