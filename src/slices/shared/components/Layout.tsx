import React from 'react';
import { 
  Box, 
  Container, 
  CssBaseline, 
  ThemeProvider, 
  createTheme 
} from '@mui/material';
import Navigation from './Navigation';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          height: '40px',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#1976d2', 
    },
    background: {
      default: '#f4f4f4', 
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh' 
        }}
      >
        <Navigation />
        
        <Container 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            mt: 4, 
            mb: 4 
          }}
        >
          {children}
        </Container>
        
        <Box 
          component="footer" 
          sx={{ 
            py: 3, 
            px: 2, 
            mt: 'auto', 
            backgroundColor: 'background.paper' 
          }}
        >

          <Container maxWidth="sm">
            <p style={ { display: "flex", alignItems: "center", justifyContent: "center" } }>© {new Date().getFullYear()} Social Periferia</p>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;