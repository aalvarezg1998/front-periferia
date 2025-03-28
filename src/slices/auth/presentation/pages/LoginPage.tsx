import React from 'react';
import { Box, Container } from '@mui/material';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <Container component="main" >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <LoginForm />
      </Box>
    </Container>
  );
};

export default LoginPage;