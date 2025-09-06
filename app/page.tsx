'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, Users, FileText, Shield, CheckCircle, Award, Globe } from 'lucide-react';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-50">
      <Header />
      
      <main className="flex-1">
        <section className="relative bg-gradient-to-br from-government-blue via-blue-800 to-blue-900 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute top-10 right-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white opacity-10 rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white opacity-10 rounded-full"></div>
          
          <div className="container-custom relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2 mb-6">
                    <Award className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Official Government Portal</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    {t.hero.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                    {t.hero.subtitle}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      href="/schemes" 
                      className="inline-flex items-center justify-center bg-white text-government-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
                    >
                      {t.hero.checkEligibility}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link 
                      href="/chatbot" 
                      className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-government-blue transition-all"
                    >
                      <Globe className="mr-2 h-5 w-5" />
                      Get Help
                    </Link>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-2">500+</div>
                        <div className="text-blue-200 text-sm">Schemes Available</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-2">1M+</div>
                        <div className="text-blue-200 text-sm">Users Helped</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-2">₹50Cr+</div>
                        <div className="text-blue-200 text-sm">Benefits Disbursed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-2">24/7</div>
                        <div className="text-blue-200 text-sm">Support Available</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-800 mb-6">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Simple steps to find and apply for government schemes with our comprehensive platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-government-blue to-blue-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-800">Create Profile</h3>
                <p className="text-gray-600 dark:text-gray-600 leading-relaxed">
                  Answer simple questions about your background, income, location, and eligibility criteria
                </p>
              </div>
              
              <div className="text-center group">
                <div className="bg-gradient-to-br from-government-green to-green-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <FileText className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-800">Find Schemes</h3>
                <p className="text-gray-600 dark:text-gray-600 leading-relaxed">
                  Discover government schemes and scholarships you are eligible for based on your profile
                </p>
              </div>
              
              <div className="text-center group">
                <div className="bg-gradient-to-br from-government-orange to-orange-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-800">Apply Easily</h3>
                <p className="text-gray-600 dark:text-gray-600 leading-relaxed">
                  Apply directly through official portals or use our guided application process
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-100 dark:to-blue-100">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-800 mb-6">
                Why Choose SahayakAI?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-600 mb-12">
                We make government schemes accessible to everyone with our user-friendly platform
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white dark:bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <CheckCircle className="h-8 w-8 text-government-green mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-800 mb-2">Verified Information</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-600">All scheme details are verified and up-to-date</p>
                </div>
                
                <div className="bg-white dark:bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <Globe className="h-8 w-8 text-government-blue mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-800 mb-2">Multi-Language</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-600">Available in English, Hindi, and Marathi</p>
                </div>
                
                <div className="bg-white dark:bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <Shield className="h-8 w-8 text-government-orange mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-800 mb-2">Secure Platform</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-600">Your data is protected with government-grade security</p>
                </div>
                
                <div className="bg-white dark:bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <Award className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-800 mb-2">Expert Support</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-600">Get help from our trained assistance team</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-custom">
            <div className="bg-white dark:bg-gray-50 rounded-2xl shadow-xl p-12 text-center border border-gray-200 dark:border-gray-300">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-800 mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of citizens who have successfully applied for government schemes through our platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/schemes" 
                  className="btn-primary text-lg px-8 py-4"
                >
                  Browse Schemes
                </Link>
                <Link 
                  href="/contact" 
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
