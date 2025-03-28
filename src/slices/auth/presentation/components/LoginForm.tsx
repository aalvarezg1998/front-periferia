import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Stack, 
  Container, 
  useMediaQuery, 
  useTheme
} from '@mui/material';
import { LoginUseCase } from '../../application/useCases/loginUseCase';
import { AuthRepository } from '../../infrastructure/repositories/AuthRepository';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../shared/context/AppContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const authRepository = new AuthRepository();
    const loginUseCase = new LoginUseCase(authRepository);

    try {
      const user = await loginUseCase.execute({ username, password });
      sessionStorage.setItem('token', user.token);
      login(user.token);
      navigate('/publications');
    } catch (error) {
      setError('Credenciales inválidas');
      console.error('Error de inicio de sesión:', error);
    }
  };

  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      <Stack
        direction={isMobile ? 'column' : 'row'}
        spacing={4}
        sx={{ 
          width: '100%', 
          maxWidth: 1200, 
          height: isMobile ? 'auto' : '70vh' 
        }}
      >
        <Box
          sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            px: 2 
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              color: 'primary.main',
              fontSize: isMobile ? '2.5rem' : '3.5rem'
            }}
          >
            Social Perferia
          </Typography>
          <Typography 
            variant="h6" 
            component="p" 
            color="text.secondary"
            sx={{ 
              fontSize: isMobile ? '1rem' : '1.25rem',
            }}
          >
            Conecta, comparte y crece con nuestra comunidad Perifera TI Group. 
            Descubre nuevas perspectivas, conecta nuevas conexiones 
            y expande tu red social de manera intuitiva y divertida.
          </Typography>
        </Box>

        <Box
          sx={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '100%' 
          }}
        >
          <Card 
            sx={{ 
              width: '100%', 
              maxWidth: 400, 
              boxShadow: 3, 
              borderRadius: 5 
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography 
                component="h1" 
                variant="h4" 
                align="center" 
                sx={{ mb: 3 }}
              >
                Iniciar Sesión
              </Typography>
              
              {error && (
                <Typography 
                  color="error" 
                  align="center" 
                  sx={{ mb: 2 }}
                >
                  {error}
                </Typography>
              )}
              
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  variant='standard'
                  required
                  fullWidth
                  label="Usuario"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  />
                <TextField
                  variant='standard'
                  margin="normal"
                  required
                  fullWidth
                  label="Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Iniciar Sesión
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;