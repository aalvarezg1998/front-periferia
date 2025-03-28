import { useState, useEffect } from 'react';
import { AuthService } from '../../auth/application/services/authService';
import { User } from '../../auth/domain/models/User';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authService = new AuthService();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    login,
    logout
  };
};