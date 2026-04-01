import { useState } from 'react';
import { CarModal } from './CarModal';
import { Fuel, Gauge, Zap, Calendar, Info, Star } from 'lucide-react';
import { useStore, Car } from '../store/useStore';

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, language } = useStore();

  const brand = car.brand[language] || car.brand['en'] || Object.values(car.brand)[0];
  const model = car.model[language] || car.model['en'] || Object.values(car.model)[0];
  const power = car.power[language] || car.power['en'] || Object.values(car.power)[0];
  const fuel = car.fuel[language] || car.fuel['en'] || Object.values(car.fuel)[0];

  return (
    <>
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
        {/* Placeholder Image */}
        <div className="aspect-[16/9] bg-slate-100 relative overflow-hidden">
          <img 
            src={car.image_url || "https://images.unsplash.com/photo-1614162692292-7ac56d7fd761?auto=format&fit=crop&q=80&w=800"} 
            alt={`${brand} ${model}`}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm uppercase tracking-wider">
            {brand}
          </div>
          {car.rating && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full text-xs font-bold text-amber-600 shadow-sm flex items-center gap-1">
              <Star size={12} className="fill-amber-400" />
              {car.rating}
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-4">
            <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">
              {brand}
            </h3>
            <p className="text-slate-500 font-medium text-sm">
              {model}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6">
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <Calendar size={16} className="text-slate-400" />
              <span>{car.year}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <Gauge size={16} className="text-slate-400" />
              <span>{car.km}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <Zap size={16} className="text-slate-400" />
              <span>{power}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <Fuel size={16} className="text-slate-400" />
              <span>{fuel}</span>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-auto w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Info size={16} />
            {t('car_card.details')}
          </button>
        </div>
      </div>

      {isModalOpen && <CarModal car={car} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
