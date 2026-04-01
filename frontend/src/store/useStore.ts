import { create } from 'zustand';
import { translations } from '../i18n/translations';

export type Language = 'de' | 'ro' | 'en' | 'it' | 'ru' | 'ar' | 'tr';

export interface Service {
  slug: string;
  icon_name: string;
  titles: Record<string, string>;
  descriptions?: Record<string, string>;
  order: number;
}

export interface Partner {
  name: string;
  logo_url: string;
  descriptions: Record<string, string>;
  whatsapp_number: string;
  website: string;
  rating: string;
}

export interface ServiceDetail extends Service {
  partners: Partner[];
}

export interface Car {
  id: number;
  brand: Record<string, string>;
  model: Record<string, string>;
  year: number;
  km: string;
  power: Record<string, string>;
  fuel: Record<string, string>;
  price: string | null;
  image_url: string;
  is_featured: boolean;
  rating: string;
  
  // Detailed specs
  series?: Record<string, string>;
  equipment?: Record<string, string>;
  displacement?: string;
  seats?: string;
  doors?: string;
  pollution?: string;
  itp?: Record<string, string>;
  climate?: Record<string, string>;
  airbags?: Record<string, string>;
  color_mfr?: string;
  color?: Record<string, string>;
  interior?: Record<string, string>;
  towing_braked?: string;
  towing_unbraked?: string;
  weight?: string;
  cylinders?: string;
  tank?: string;
  engine_drive?: Record<string, string>;
  energy_consumption?: Record<string, string>;
  co2_emissions?: string;
  fuel_consumption?: Record<string, string>;
}

interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;
  isContactModalOpen: boolean;
  setContactModalOpen: (isOpen: boolean) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  t: (key: string) => string;
  
  // Data State
  services: Service[];
  cars: Car[];
  selectedService: ServiceDetail | null;
  isLoading: boolean;
  
  // Actions
  fetchServices: () => Promise<void>;
  fetchCars: () => Promise<void>;
  fetchServiceDetail: (slug: string) => Promise<void>;
}

const API_URL = 'http://localhost:8000/api';

export const useStore = create<AppState>((set, get) => ({
  language: (localStorage.getItem('app_lang') as Language) || 'de',
  setLanguage: (lang) => {
    localStorage.setItem('app_lang', lang);
    set({ language: lang });
  },
  isContactModalOpen: false,
  setContactModalOpen: (isOpen) => set({ isContactModalOpen: isOpen }),
  token: localStorage.getItem('token'),
  setToken: (token) => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
    set({ token });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null });
  },
  t: (path: string) => {
    const lang = get().language || 'de';
    
    // Check if the path is a direct key in translations for the current language
    const keys = path.split('.');
    let current: any = translations[lang];
    for (const key of keys) {
      if (!current || current[key] === undefined) {
        // Fallback to searching in the data (titles from DB)
        return path;
      }
      current = current[key];
    }
    return current;
  },

  // Data Actions
  services: [],
  cars: [],
  selectedService: null,
  isLoading: false,

  fetchServices: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/services/`);
      const data = await response.json();
      set({ services: data, isLoading: false });
    } catch (error) {
      console.error('Error fetching services:', error);
      set({ isLoading: false });
    }
  },

  fetchCars: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/cars/`);
      const data = await response.json();
      set({ cars: data, isLoading: false });
    } catch (error) {
      console.error('Error fetching cars:', error);
      set({ isLoading: false });
    }
  },

  fetchServiceDetail: async (slug: string) => {
    set({ isLoading: true, selectedService: null });
    try {
      const response = await fetch(`${API_URL}/services/${slug}/`);
      if (!response.ok) throw new Error('Service not found');
      const data = await response.json();
      set({ selectedService: data, isLoading: false });
    } catch (error) {
      console.error('Error fetching service detail:', error);
      set({ isLoading: false });
    }
  }
}));
