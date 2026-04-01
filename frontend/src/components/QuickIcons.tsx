import { useStore } from '../store/useStore';
import { HandCoins, Shield, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export function QuickIcons() {
  const { t } = useStore();

  const icons = [
    { id: 'finance', serviceId: 's2', icon: HandCoins, label: t('quick_icons.finance'), color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'insurance', serviceId: 's5', icon: Shield, label: t('quick_icons.insurance'), color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'registration', serviceId: 's7', icon: FileText, label: t('quick_icons.registration'), color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <section className="py-12 md:py-16 bg-white border-b border-slate-100 relative z-20 -mt-10 rounded-t-[40px] shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* Image - Left on desktop, Bottom on mobile */}
          <div className="order-2 lg:order-1 w-full lg:w-1/2 rounded-[2rem] overflow-hidden shadow-lg h-[250px] md:h-[350px] relative group">
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" 
              alt="Professional Handshake" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
          </div>

          {/* Icons - Right on desktop, Top on mobile */}
          <div className="order-1 lg:order-2 w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {icons.map((item) => (
              <Link key={item.id} to={`/service/${item.serviceId}`} className="group flex flex-col items-center justify-center p-4 md:p-6 rounded-3xl hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-100 hover:shadow-xl hover:-translate-y-1">
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${item.bg} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <item.icon className={`w-8 h-8 md:w-10 md:h-10 ${item.color}`} strokeWidth={1.5} />
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-800 text-center tracking-tight">
                  {item.label}
                </h3>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
