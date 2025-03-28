import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { AuthRepository } from '../../auth/infrastructure/repositories/AuthRepository';
import { decodeToken } from '../../auth/utils/DecodeJWT';
import { User } from '../../auth/domain/models/User';

interface AuthContextType {
  userId: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'userToken';
const authRepository = new AuthRepository();

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(async () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      await authRepository.logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setUserId(null);
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const curretUser = useCallback(async (username: string) => {
    try {
      const userData = await authRepository.getCurrentUser(username);
      if (userData) setUser(userData);
    } catch (error) {
      console.error('Error obteniendo datos de usuario:', error);
      logout();
    }
  }, [logout]);

  const checkAuthStatus = useCallback(async () => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);

      if (storedToken) {
        const decodedToken = decodeToken(storedToken);

        if (decodedToken) {
          const isTokenValid = decodedToken.exp! > Date.now() / 1000;

          if (isTokenValid) {
            const userId = decodedToken.sub!;
            setUserId(userId);
            setIsAuthenticated(true);
            await curretUser(userId);
          } else {
            logout();
          }
        }
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout, curretUser]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = useCallback((token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    const userToken = decodeToken(token);

    if (userToken) {
      const userId = userToken.sub!;
      setUserId(userId);
      setIsAuthenticated(true);
      curretUser(userId);
    }
  }, [curretUser]);

  const contextValue = React.useMemo(() => ({
    userId,
    login,
    logout,
    isAuthenticated,
    user,
    loading,
  }), [userId, login, logout, isAuthenticated, user, loading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
