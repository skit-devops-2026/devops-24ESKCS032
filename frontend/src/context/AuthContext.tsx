import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';
import { MOCK_USERS } from '../mock/data';

interface AuthContextType {
  user: User | null;
  login: (email: string, _password: string) => Promise<boolean>;
  loginAs: (role: 'ADMIN' | 'USER') => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = 'smarthome_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const login = async (email: string, _password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));
    const found = MOCK_USERS.find(u => u.email === email);
    if (found) {
      persist(found);
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const loginAs = (role: 'ADMIN' | 'USER') => {
    const found = MOCK_USERS.find(u => u.role === role);
    if (found) persist(found);
  };

  const logout = () => {
    persist(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, loginAs, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
