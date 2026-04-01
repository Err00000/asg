import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore, Partner } from '../store/useStore';
import { ArrowLeft, ExternalLink, Info, MapPin, Star, Car, Lock, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CarCard } from '../components/CarCard';

export function ServicePage() {
  const { id: slug } = useParams<{ id: string }>();
  const { t, token, selectedService, fetchServiceDetail, isLoading, language, cars, fetchCars } = useStore();
  const navigate = useNavigate();
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  useEffect(() => {
    if (slug) {
      fetchServiceDetail(slug);
      if (slug === 'car-sales') {
        fetchCars();
      }
    }
  }, [slug, fetchServiceDetail, fetchCars]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!selectedService) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Service not found</h2>
        <Link to="/" className="text-blue-600 font-semibold hover:underline flex items-center gap-2">
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>
    );
  }

  const serviceTitle = selectedService.titles[language] || selectedService.titles['en'] || selectedService.slug;
  const isCarSales = slug === 'car-sales';

  return (
    <div className="min-h-screen bg-slate-50 py-12 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          {t('nav.home')}
        </Link>

        {/* Header */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-50"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              {serviceTitle}
            </h1>
            <div className="w-20 h-1.5 bg-blue-600 rounded-full"></div>
            {selectedService.descriptions && selectedService.descriptions[language] && (
              <p className="mt-6 text-slate-600 text-lg max-w-2xl leading-relaxed">
                {selectedService.descriptions[language]}
              </p>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <span className="bg-blue-100 text-blue-700 p-2 rounded-lg">
              {isCarSales ? <Car size={20} /> : <Star size={20} />}
            </span>
            {isCarSales ? t('service_page.offers') : t('service_page.partners')}
          </h2>
          
          {isCarSales ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
                <CarCard 
                  key={car.id} 
                  car={car}
                />
              ))}
              {cars.length === 0 && (
                <div className="col-span-full py-12 text-center text-slate-400">
                  Nu există oferte disponibile momentan.
                </div>
              )}
            </div>
          ) : (
            <>
              {token ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedService.partners.map((partner, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col h-full group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          {partner.logo_url && (
                            <img src={partner.logo_url} alt={partner.name} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                          )}
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{partner.name}</h3>
                        </div>
                        {partner.rating && (
                          <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-md text-sm font-bold">
                            <Star size={14} className="fill-amber-400 text-amber-400" />
                            {partner.rating}
                          </div>
                        )}
                      </div>
                      
                      <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed">
                        {partner.descriptions[language] || partner.descriptions['en'] || 'No description available.'}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-slate-50">
                        <button 
                          onClick={() => setSelectedPartner(partner)}
                          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-sm transition-colors border border-slate-200"
                        >
                          <Info size={16} />
                          {t('service_page.details')}
                        </button>
                        {partner.whatsapp_number && (
                          <a 
                            href={`https://wa.me/${partner.whatsapp_number.replace('+', '').replace(/\s/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-colors shadow-sm hover:shadow-md"
                          >
                            <ExternalLink size={16} />
                            {t('service_page.contact_whatsapp')}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                  {selectedService.partners.length === 0 && (
                    <div className="col-span-full py-12 text-center text-slate-400">
                      Nu există parteneri disponibili pentru acest serviciu momentan.
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
                  <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Lock size={40} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{t('service_page.restricted_title')}</h3>
                  <p className="text-slate-500 max-w-md mx-auto mb-8">
                    {t('service_page.restricted_desc')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/login" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md">
                      {t('service_page.login_btn')}
                    </Link>
                    <Link to="/register" className="px-8 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all">
                      {t('service_page.register_btn')}
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </div>

      {/* Partner Details Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedPartner(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
            >
              <ArrowLeft size={24} className="rotate-45" />
            </button>
            
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                {selectedPartner.logo_url && (
                  <img src={selectedPartner.logo_url} alt={selectedPartner.name} className="w-16 h-16 rounded-2xl object-cover shadow-md" />
                )}
                <h2 className="text-2xl font-bold text-slate-900">{selectedPartner.name}</h2>
              </div>
              
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">{t('service_page.about_partner')}</h4>
              <p className="text-slate-600 leading-relaxed mb-8">
                {selectedPartner.descriptions[language] || selectedPartner.descriptions['en'] || 'No additional details available.'}
              </p>
              
              {selectedPartner.website && (
                <div className="mb-6">
                  <a 
                    href={selectedPartner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-2 text-sm font-medium"
                  >
                    <ExternalLink size={16} />
                    Vizitează website-ul
                  </a>
                </div>
              )}
              
              {token ? (
                selectedPartner.whatsapp_number && (
                  <a 
                    href={`https://wa.me/${selectedPartner.whatsapp_number.replace('+', '').replace(/\s/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg transition-all shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5"
                  >
                    {t('service_page.contact_whatsapp')} {t('service_page.via_whatsapp')}
                    <ExternalLink size={20} />
                  </a>
                )
              ) : (
                <button 
                  onClick={() => {
                    setSelectedPartner(null);
                    navigate('/login');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg transition-all"
                >
                  <Lock size={20} />
                  {t('service_page.login_to_contact_partner')}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
