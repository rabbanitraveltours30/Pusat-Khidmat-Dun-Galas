import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  icNumber: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, icNumber: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking local storage for existing session
    const savedUser = localStorage.getItem('galas_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock user
    const mockUser: User = {
      id: '1',
      name: email.includes('admin') ? 'Administrator' : 'Warga Galas',
      email: email,
      icNumber: '900101-03-1234',
      role: email.includes('admin') ? 'admin' : 'user'
    };
    
    setUser(mockUser);
    localStorage.setItem('galas_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const register = async (name: string, email: string, icNumber: string, _password: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      icNumber,
      role: email.includes('admin') ? 'admin' : 'user'
    };
    
    setUser(newUser);
    localStorage.setItem('galas_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('galas_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
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
