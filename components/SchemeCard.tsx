'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Scheme } from '@/lib/schemes';
import { ExternalLink, FileText, Users } from 'lucide-react';

interface SchemeCardProps {
  scheme: Scheme;
}

export default function SchemeCard({ scheme }: SchemeCardProps) {
  const { language, t } = useLanguage();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'education': return 'bg-blue-100 text-blue-800';
      case 'agriculture': return 'bg-green-100 text-green-800';
      case 'healthcare': return 'bg-red-100 text-red-800';
      case 'employment': return 'bg-purple-100 text-purple-800';
      case 'housing': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card hover:shadow-lg transition-shadow h-full flex flex-col dark:bg-white dark:border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-800 mb-2">
            {scheme.name[language]}
          </h3>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(scheme.category)}`}>
            {scheme.category.charAt(0).toUpperCase() + scheme.category.slice(1)}
          </span>
        </div>
        <div className="text-right ml-4">
          <p className="text-government-blue font-semibold">{scheme.amount}</p>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <div>
          <div className="flex items-center mb-2">
            <Users className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
            <h4 className="font-medium text-gray-900 dark:text-gray-800">{t.schemes.eligibility}</h4>
          </div>
          <ul className="text-sm text-gray-600 dark:text-gray-600 space-y-1">
            {scheme.eligibility[language].map((criterion, index) => (
              <li key={index} className="flex items-start">
                <span className="text-government-blue mr-2">•</span>
                {criterion}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
            <h4 className="font-medium text-gray-900 dark:text-gray-800">{t.schemes.documents}</h4>
          </div>
          <ul className="text-sm text-gray-600 dark:text-gray-600 space-y-1">
            {scheme.documents[language].map((document, index) => (
              <li key={index} className="flex items-start">
                <span className="text-government-blue mr-2">•</span>
                {document}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-300 space-y-3">
        <a
          href={scheme.officialLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full btn-primary flex items-center justify-center"
        >
          {t.schemes.applyGovernment}
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
        <a
          href={`/upload?scheme=${scheme.id}`}
          className="w-full btn-secondary flex items-center justify-center"
        >
          {t.schemes.applyThroughUs}
        </a>
      </div>
    </div>
  );
}
