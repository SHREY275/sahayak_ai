'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { X, User, Mail, Phone, MapPin, DollarSign, Calendar, Flag } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onModeChange: (mode: 'login' | 'signup') => void;
}

export default function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const { t } = useLanguage();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    annualIncome: '',
    phone: '',
    email: '',
    password: '',
    city: '',
    state: '',
    nationality: 'Indian'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'signup') {
      const userData = {
        id: Date.now().toString(),
        name: formData.name,
        age: parseInt(formData.age),
        annualIncome: formData.annualIncome,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        city: formData.city,
        state: formData.state,
        nationality: formData.nationality
      };
      login(userData);
    } else {
      // For login, just check if user exists in localStorage
      const existingUser = localStorage.getItem('sahayakai_user');
      if (existingUser) {
        const user = JSON.parse(existingUser);
        if (user.email === formData.email && user.password === formData.password) {
          login(user);
        } else {
          alert('Invalid email or password');
          return;
        }
      } else {
        alert('No account found. Please sign up first.');
        return;
      }
    }
    
    onClose();
    setFormData({
      name: '',
      age: '',
      annualIncome: '',
      phone: '',
      email: '',
      password: '',
      city: '',
      state: '',
      nationality: 'Indian'
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-50 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-800">
            {mode === 'login' ? 'Login' : 'Create Account'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex space-x-4 mb-6">
            <button
              type="button"
              onClick={() => onModeChange('login')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === 'login'
                  ? 'bg-government-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-200 dark:text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => onModeChange('signup')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === 'signup'
                  ? 'bg-government-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-200 dark:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          {mode === 'signup' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-600 mb-2">
                    <User className="h-4 w-4 inline mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-government-blue dark:bg-white"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    required
                    min="18"
                    max="100"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-government-blue dark:bg-white"
                    placeholder="Enter your age"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-600 mb-2">
                    <DollarSign className="h-4 w-4 inline mr-1" />
                    Annual Income *
                  </label>
                  <input
                    type="text"
                    name="annualIncome"
                    required
                    value={formData.annualIncome}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-government-blue dark:bg-white"
                    placeholder="Enter your annual income"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-600 mb-2">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-government-blue dark:bg-white"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-600 mb-2">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-government-blue dark:bg-white"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-600 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-government-blue dark:bg-white"
                    placeholder="Create a password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-government-blue dark:bg-white"
                    placeholder="Enter your city"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-600 mb-2">
                    State *
                  </label>
                  <select
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-government-blue dark:bg-white"
                  >
                    <option value="">Select State</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-600 mb-2">
                    <Flag className="h-4 w-4 inline mr-1" />
                    Nationality *
                  </label>
                  <select
                    name="nationality"
                    required
                    value={formData.nationality}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-government-blue dark:bg-white"
                  >
                    <option value="Indian">Indian</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {mode === 'login' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-600 mb-2">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-government-blue dark:bg-white"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-600 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-government-blue dark:bg-white"
                  placeholder="Enter your password"
                />
              </div>
            </>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 dark:border-gray-400 text-gray-700 dark:text-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {mode === 'login' ? 'Login' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
