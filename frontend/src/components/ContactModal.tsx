import { X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useState } from 'react';

export function ContactModal() {
  const { isContactModalOpen, setContactModalOpen, t } = useStore();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (!isContactModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('http://localhost:8000/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          setContactModalOpen(false);
          setStatus('idle');
          setFormData({ name: '', email: '', phone: '', message: '' });
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={() => {
            setContactModalOpen(false);
            if (status === 'success') {
              setStatus('idle');
              setFormData({ name: '', email: '', phone: '', message: '' });
            }
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
        >
          <X size={24} />
        </button>
        
        <div className="p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">{t('contact_form.title')}</h2>
          
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('contact_form.success_title')}</h3>
              <p className="text-slate-600 font-medium">{t('contact_form.success_msg')}</p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {status === 'error' && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 mb-4 border border-red-100 animate-in fade-in">
                  <AlertCircle size={20} className="shrink-0" />
                  <p className="text-sm font-medium">{t('contact_form.error_msg')}</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('contact_form.name')}</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('contact_form.email')}</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('contact_form.phone')}</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('contact_form.message')}</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all mt-6 flex justify-center items-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    {t('contact_form.sending')}
                  </>
                ) : (
                  t('contact_form.send')
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
