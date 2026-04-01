import { Hero } from '../components/Hero';
import { QuickIcons } from '../components/QuickIcons';
import { ServicesGrid } from '../components/ServicesGrid';

export function Home() {
  return (
    <div className="animate-in fade-in duration-500">
      <Hero />
      <QuickIcons />
      <ServicesGrid />
    </div>
  );
}
