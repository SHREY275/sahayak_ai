'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import LanguageSwitcher from './LanguageSwitcher';
import DarkModeToggle from './DarkModeToggle';
import AuthModal from './AuthModal';
import { Building2, User, LogOut } from 'lucide-react';

export default function Header() {
  const { t } = useLanguage();
  const { user, logout, isLoggedIn } = useUser();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-50 shadow-sm border-b border-gray-200 dark:border-gray-300">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-government-blue" />
              <Link href="/" className="text-xl font-bold text-government-blue">
                {t.siteName}
              </Link>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 dark:text-gray-600 hover:text-government-blue font-medium">
                {t.nav.home}
              </Link>
              <Link href="/schemes" className="text-gray-700 dark:text-gray-600 hover:text-government-blue font-medium">
                {t.nav.schemes}
              </Link>
              <Link href="/chatbot" className="text-gray-700 dark:text-gray-600 hover:text-government-blue font-medium">
                {t.nav.chatbot}
              </Link>
              <Link href="/contact" className="text-gray-700 dark:text-gray-600 hover:text-government-blue font-medium">
                {t.nav.contact}
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <DarkModeToggle />
              
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-600">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{user?.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-700"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="text-gray-700 dark:text-gray-600 hover:text-government-blue font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="btn-primary text-sm px-4 py-2"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
}
