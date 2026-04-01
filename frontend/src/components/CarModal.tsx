import { X, Info, Gauge, Zap, Fuel, Calendar, Settings, User, DoorOpen, Wind, Shield, Palette, Sofa, Weight, Cylinder, Fuel as GasPump, Activity, Leaf, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore, Car } from '../store/useStore';
import { Link } from 'react-router-dom';

interface CarModalProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
}

export function CarModal({ car, isOpen, onClose }: CarModalProps) {
  const { token, t, language } = useStore();
  
  const getTranslation = (field: Record<string, string> | undefined) => {
    if (!field) return "";
    return field[language] || field['en'] || Object.values(field)[0] || "";
  };

  const brand = getTranslation(car.brand);
  const model = getTranslation(car.model);

  const specs = [
    { icon: Settings, label: t('car_modal.specs.series'), value: getTranslation(car.series) },
    { icon: Info, label: t('car_modal.specs.equipment'), value: getTranslation(car.equipment) },
    { icon: Activity, label: t('car_modal.specs.displacement'), value: car.displacement },
    { icon: User, label: t('car_modal.specs.seats'), value: car.seats },
    { icon: DoorOpen, label: t('car_modal.specs.doors'), value: car.doors },
    { icon: Leaf, label: t('car_modal.specs.pollution'), value: car.pollution },
    { icon: Calendar, label: t('car_modal.specs.itp'), value: getTranslation(car.itp) },
    { icon: Wind, label: t('car_modal.specs.climate'), value: getTranslation(car.climate) },
    { icon: Shield, label: t('car_modal.specs.airbags'), value: getTranslation(car.airbags) },
    { icon: Palette, label: t('car_modal.specs.color_mfr'), value: car.color_mfr },
    { icon: Palette, label: t('car_modal.specs.color'), value: getTranslation(car.color) },
    { icon: Sofa, label: t('car_modal.specs.interior'), value: getTranslation(car.interior) },
    { icon: Weight, label: t('car_modal.specs.towing_braked'), value: car.towing_braked },
    { icon: Weight, label: t('car_modal.specs.towing_unbraked'), value: car.towing_unbraked },
    { icon: Weight, label: t('car_modal.specs.weight'), value: car.weight },
    { icon: Cylinder, label: t('car_modal.specs.cylinders'), value: car.cylinders },
    { icon: GasPump, label: t('car_modal.specs.tank'), value: car.tank },
    { icon: Settings, label: t('car_modal.specs.engine_drive'), value: getTranslation(car.engine_drive) },
    { icon: Activity, label: t('car_modal.specs.energy_consumption'), value: getTranslation(car.energy_consumption) },
    { icon: Leaf, label: t('car_modal.specs.co2_emissions'), value: car.co2_emissions },
    { icon: GasPump, label: t('car_modal.specs.fuel_consumption'), value: getTranslation(car.fuel_consumption) },
  ].filter(spec => spec.value); // Only show specs that have a value

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">{brand}</h2>
                <p className="text-slate-500 font-medium">{model}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 rounded-full transition-all active:scale-95"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {specs.map((spec, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0 md:[&:nth-last-child(-n+2)]:border-0">
                    <div className="flex items-center gap-3 text-slate-500">
                      <spec.icon size={18} className="text-blue-500" strokeWidth={1.5} />
                      <span className="text-sm font-medium">{spec.label}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900 text-right ml-4">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-100 mt-auto">
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
                {token ? (
                  <div>
                    <span className="text-slate-500 text-sm block font-medium">{t('car_modal.price_info')}</span>
                    <span className="text-3xl font-black text-slate-900">{car.price} €</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex-1">
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Lock size={24} />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-sm leading-tight">{t('car_modal.price_restricted')}</p>
                      <p className="text-slate-500 text-xs mt-1">
                        <Link to="/login" className="text-blue-600 font-bold hover:underline" onClick={onClose}>{t('nav.login')}</Link> {t('car_modal.login_to_see_price')}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-3 w-full sm:w-auto">
                  {token ? (
                    <a 
                      href="https://wa.me/49123456789" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none py-4 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
                    >
                      {t('car_modal.contact_whatsapp')}
                    </a>
                  ) : (
                    <Link
                      to="/login"
                      onClick={onClose}
                      className="flex-1 sm:flex-none py-4 px-8 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all text-center flex items-center justify-center gap-2"
                    >
                      <Lock size={16} />
                      {t('hero.login_to_contact')}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
