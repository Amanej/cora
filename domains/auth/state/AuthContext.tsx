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
    // console.log("Checking for user");
    const token = localStorage.getItem('token');
    if (token) {
      // console.log("Token found ",token);
      setToken(token);
      setIsAuthenticated(true);
      fetchUser(token)
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

  const fetchUser = async (_token: string) => {
    // console.log("Fetching user");
    const tokenToSend = _token.length > 0 ? _token : token;
    const response = await fetch(APP_CONFIG.backendUrl+"/users/me", {
      headers: {
        'Authorization': `${tokenToSend}`
      }
    })
    const data = await response.json()
    // console.log("User fetched", data);
    setUser(data)
  }

  const isApproved = () => {
    return user?.approved ?? false
  }

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
