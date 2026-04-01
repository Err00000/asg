import { useStore } from '../store/useStore';
import logo from '../logo.png';

export function Footer() {
  const { t, token } = useStore();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden shadow-lg">
                <img src={logo} alt="Auto Solution Group Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white leading-tight tracking-tight">AUTO SOLUTION</span>
                <span className="text-lg font-bold text-slate-300 leading-tight tracking-tight">GROUP</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              {t('hero.subtitle')}
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Links</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="/" className="hover:text-blue-400 transition-colors">{t('nav.home')}</a></li>
              <li><a href="/#services" className="hover:text-blue-400 transition-colors">{t('nav.services')}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {currentYear} Auto Solution Group. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
