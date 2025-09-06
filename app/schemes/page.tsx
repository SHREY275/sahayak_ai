'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemeCard from '@/components/SchemeCard';
import { schemes } from '@/lib/schemes';
import { useState } from 'react';
import { Filter } from 'lucide-react';

export default function SchemesPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'All Schemes' },
    { value: 'education', label: 'Education' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'employment', label: 'Employment' },
    { value: 'housing', label: 'Housing' }
  ];

  const filteredSchemes = selectedCategory === 'all' 
    ? schemes 
    : schemes.filter(scheme => scheme.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-50">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-800 mb-4">
              {t.schemes.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-600 max-w-2xl mx-auto">
              {t.schemes.subtitle}
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
              <span className="font-medium text-gray-900 dark:text-gray-800">Filter by Category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-government-blue text-white'
                      : 'bg-gray-100 dark:bg-gray-200 text-gray-700 dark:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-300'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>

          {filteredSchemes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-500 text-lg">No schemes found for the selected category.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
