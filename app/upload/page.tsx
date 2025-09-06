'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { schemes } from '@/lib/schemes';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Upload, Check, ArrowLeft, User, FileText, Building2 } from 'lucide-react';
import Link from 'next/link';

interface UploadedFile {
  id: string;
  name: string;
  file: File;
  type: 'aadhar' | 'pan' | 'income' | 'bank' | 'marksheet' | 'caste' | 'property' | 'other';
}

export default function UploadPage() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const schemeId = searchParams.get('scheme');
  const [scheme, setScheme] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (schemeId) {
      const foundScheme = schemes.find(s => s.id === schemeId);
      setScheme(foundScheme);
    }
  }, [schemeId]);

  const requiredDocuments = [
    { id: 'aadhar', name: 'Aadhaar Card', required: true },
    { id: 'pan', name: 'PAN Card', required: true },
    { id: 'income', name: 'Income Certificate', required: true },
    { id: 'bank', name: 'Bank Account Details', required: true }
  ];

  const handleFileUpload = (file: File, type: string) => {
    const newFile: UploadedFile = {
      id: Date.now().toString(),
      name: file.name,
      file: file,
      type: type as any
    };
    setUploadedFiles(prev => [...prev.filter(f => f.type !== type), newFile]);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const allRequiredDocs = requiredDocuments.filter(doc => doc.required);
    const uploadedRequiredDocs = uploadedFiles.filter(file => 
      allRequiredDocs.some(doc => doc.id === file.type)
    );
    
    if (uploadedRequiredDocs.length === allRequiredDocs.length) {
      setIsSubmitted(true);
    } else {
      alert('Please upload all required documents.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-green-800 mb-4">
                  {t.upload.successTitle}
                </h1>
                <p className="text-green-700 mb-6">
                  {t.upload.successMessage}
                </p>
                <Link 
                  href="/schemes" 
                  className="btn-primary inline-flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t.upload.backToSchemes}
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link 
                href="/schemes" 
                className="inline-flex items-center text-government-blue hover:text-blue-700 mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Schemes
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t.upload.title}
              </h1>
              <p className="text-lg text-gray-600">
                {t.upload.subtitle}
              </p>
              {scheme && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900">Applying for: {scheme.name[t.language]}</h3>
                  <p className="text-blue-700">Amount: {scheme.amount}</p>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-government-blue" />
                  {t.upload.documents}
                </h2>
                
                <div className="space-y-6">
                  {requiredDocuments.map((doc) => {
                    const uploadedFile = uploadedFiles.find(f => f.type === doc.id);
                    return (
                      <div key={doc.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-medium text-gray-900">{doc.name}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              doc.required 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {doc.required ? t.upload.required : t.upload.optional}
                            </span>
                          </div>
                          {uploadedFile && (
                            <div className="flex items-center text-green-600">
                              <Check className="h-4 w-4 mr-1" />
                              <span className="text-sm">{t.upload.fileUploaded}</span>
                            </div>
                          )}
                        </div>
                        
                        {uploadedFile ? (
                          <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 text-green-600 mr-2" />
                              <span className="text-sm text-green-800">{uploadedFile.name}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(uploadedFile.id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                            <input
                              type="file"
                              id={doc.id}
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(file, doc.id);
                              }}
                              className="hidden"
                            />
                            <label
                              htmlFor={doc.id}
                              className="cursor-pointer flex flex-col items-center justify-center py-4"
                            >
                              <Upload className="h-8 w-8 text-gray-400 mb-2" />
                              <span className="text-sm text-gray-600">{t.upload.selectFile}</span>
                              <span className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</span>
                            </label>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="btn-primary px-8 py-3 text-lg"
                >
                  {t.upload.submitApplication}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
