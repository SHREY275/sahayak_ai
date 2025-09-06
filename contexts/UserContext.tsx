'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  age: number;
  annualIncome: string;
  phone: string;
  email: string;
  password: string;
  city: string;
  state: string;
  nationality: string;
  isLoggedIn: boolean;
}

interface UserContextType {
  user: User | null;
  login: (userData: Omit<User, 'isLoggedIn'>) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: Omit<User, 'isLoggedIn'>) => {
    const newUser = { ...userData, isLoggedIn: true };
    setUser(newUser);
    localStorage.setItem('sahayakai_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sahayakai_user');
  };

  const isLoggedIn = user?.isLoggedIn || false;

  return (
    <UserContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
