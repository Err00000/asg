import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

export function ServicesGrid() {
  const { t, services, fetchServices, language } = useStore();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const getIcon = (name: string) => {
    // @ts-ignore
    const Icon = LucideIcons[name.charAt(0).toUpperCase() + name.slice(1)] || LucideIcons.HelpCircle;
    return Icon;
  };

  const colors = [
    { color: 'text-blue-600', bg: 'bg-blue-50' },
    { color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { color: 'text-rose-600', bg: 'bg-rose-50' },
    { color: 'text-amber-600', bg: 'bg-amber-50' },
    { color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { color: 'text-slate-600', bg: 'bg-slate-100' },
    { color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t('nav.services')}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon_name);
            const style = colors[index % colors.length];
            return (
              <Link
                key={service.slug}
                to={`/service/${service.slug}`}
                className="group flex flex-col items-start p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-100 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl ${style.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${style.color}`} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-blue-900 transition-colors">
                  {service.titles[language] || service.titles['en'] || service.slug}
                </h3>
                
                <div className="mt-auto pt-6 flex items-center text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  {t('service_page.details')} <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
