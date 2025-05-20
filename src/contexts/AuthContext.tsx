
import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User, AuthTokens } from '@/types';
import { login, logout, refreshToken } from '@/services/authService';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check local storage for user and tokens
    const storedUser = localStorage.getItem('user');
    const storedTokens = localStorage.getItem('tokens');
    
    if (storedUser && storedTokens) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('tokens');
      }
    }
    
    setIsLoading(false);
  }, []);
  
  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const result = await login({ email, password });
      
      if (result) {
        setUser(result.user);
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('tokens', JSON.stringify(result.tokens));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      
      const storedTokens = localStorage.getItem('tokens');
      if (storedTokens) {
        const { accessToken } = JSON.parse(storedTokens);
        await logout(accessToken);
      }
      
      localStorage.removeItem('user');
      localStorage.removeItem('tokens');
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRefreshSession = async () => {
    try {
      const storedTokens = localStorage.getItem('tokens');
      if (!storedTokens) return false;
      
      const { refreshToken: storedRefreshToken } = JSON.parse(storedTokens) as AuthTokens;
      const newTokens = await refreshToken(storedRefreshToken);
      
      if (newTokens) {
        localStorage.setItem('tokens', JSON.stringify(newTokens));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Session refresh error:', error);
      return false;
    }
  };
  
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
    refreshSession: handleRefreshSession,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
