'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-50 dark:bg-gray-100 border-t border-gray-200 dark:border-gray-300 mt-16">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-government-blue mb-4">{t.siteName}</h3>
            <p className="text-gray-600 dark:text-gray-600">
              {t.hero.subtitle}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-600">
              <li><a href="/" className="hover:text-government-blue">{t.nav.home}</a></li>
              <li><a href="/schemes" className="hover:text-government-blue">{t.nav.schemes}</a></li>
              <li><a href="/chatbot" className="hover:text-government-blue">{t.nav.chatbot}</a></li>
              <li><a href="/contact" className="hover:text-government-blue">{t.nav.contact}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-800 mb-4">{t.nav.contact}</h4>
            <p className="text-gray-600 dark:text-gray-600">
              {t.footer.contact}
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-300 mt-8 pt-8 text-center text-gray-600 dark:text-gray-500">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
