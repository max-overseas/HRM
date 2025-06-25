import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'hr' | 'manager' | 'employee';
  department: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored auth data on app load
    const storedUser = localStorage.getItem('hrms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call your API
    if (email === 'admin@company.com' && password === 'admin123') {
      const mockUser: User = {
        id: '1',
        name: 'Sarah Johnson',
        email: 'admin@company.com',
        role: 'admin',
        department: 'Human Resources'
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('hrms_user', JSON.stringify(mockUser));
      return true;
    }
    
    if (email === 'employee@company.com' && password === 'emp123') {
      const mockUser: User = {
        id: '2',
        name: 'John Smith',
        email: 'employee@company.com',
        role: 'employee',
        department: 'Engineering'
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('hrms_user', JSON.stringify(mockUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('hrms_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};