'use client';

import APP_CONFIG from '@/lib/config';
import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  user: IUser | null;
  login: (token: string, user: IUser | null) => void;
  logout: () => void;
  isApproved: () => boolean;
}

export interface IUser {
  name: string;
  email: string;
  approved: boolean;
  max_calls: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      setIsAuthenticated(true);
      fetchUser()
    }
  }, []);

  const login = (token: string, user: IUser | null) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setToken(token);
    if (user) {
      setUser({...user, max_calls: user.max_calls || 1})
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setToken(null);
  };

  const fetchUser = async () => {
    const response = await fetch(APP_CONFIG.backendUrl+"/users/me", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()
    console.log("fetchUser data", data)
    setUser(data)
  }

  const isApproved = () => {
    return user?.approved ?? false
  }

  // console.log("token", token);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token, isApproved, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
