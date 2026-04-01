import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { LanguageModal } from './LanguageModal';
import { ContactModal } from './ContactModal';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';

export function Layout() {
  const { pathname } = useLocation();
  const token = useStore((state) => state.token);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleGlobalClick = async (e: MouseEvent) => {
      if (!token) return;

      const target = e.target as HTMLElement;
      // Find the closest meaningful interactive parent (button or link)
      const interactiveParent = target.closest('button, a, [role="button"]') as HTMLElement;
      
      const elementToTrack = interactiveParent || target;
      
      // Don't track clicks on the main layout or big containers
      if (elementToTrack.tagName === 'BODY' || elementToTrack.tagName === 'HTML' || elementToTrack.tagName === 'MAIN') return;

      const clickData = {
        element_id: elementToTrack.id || '',
        element_text: elementToTrack.innerText?.substring(0, 50).trim() || elementToTrack.getAttribute('aria-label') || elementToTrack.getAttribute('title') || '',
        page_path: pathname,
      };

      // If we have nothing to identify what was clicked, don't bother tracking
      if (!clickData.element_id && !clickData.element_text) return;

      try {
        await fetch('http://localhost:8000/api/track-click/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
          body: JSON.stringify(clickData),
        });
      } catch (err) {
        // Silently fail to not disturb user
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [pathname, token]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white selection:bg-blue-100 selection:text-blue-900">
      <LanguageModal />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ContactModal />
    </div>
  );
}
