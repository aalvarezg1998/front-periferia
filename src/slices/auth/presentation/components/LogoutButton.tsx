// src/slices/auth/presentation/components/LogoutButton.tsx
import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LogoutUseCase } from '../../application/useCases/logoutUseCase';
import { AuthRepository } from '../../infrastructure/repositories/AuthRepository';
import { useAuth } from '../../../shared/context/AppContext';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    const authRepository = new AuthRepository();
    const logoutUseCase = new LogoutUseCase(authRepository);

    try {
      await logoutUseCase.execute();
      logout(); // Actualizar estado de autenticación en el contexto
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Manejar errores de cierre de sesión (mostrar mensaje, etc.)
    }
  };

  return (
    <Button 
      variant="contained" 
      color="secondary" 
      onClick={handleLogout}
      style={{ borderRadius: 20 }}
    >
      Cerrar Sesión
    </Button>
  );
};

export default LogoutButton;