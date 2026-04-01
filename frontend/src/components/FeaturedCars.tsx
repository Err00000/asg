import { useEffect } from 'react';
import { CarCard } from './CarCard';
import { useStore } from '../store/useStore';
import { Sparkles } from 'lucide-react';

export function FeaturedCars() {
  const { t, cars, fetchCars } = useStore();

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const featuredCars = cars.filter(car => car.is_featured);

  if (featuredCars.length === 0) return null;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">
              <Sparkles size={18} />
              <span>{t('services.s1')}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
              Descoperă Ofertele Noastre <span className="text-blue-600">Premium</span>
            </h2>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <CarCard 
              key={car.id} 
              car={car}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
