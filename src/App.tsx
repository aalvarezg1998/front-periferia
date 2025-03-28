import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import { AuthProvider, useAuth } from './slices/shared/context/AppContext';
import Layout from './slices/shared/components/Layout';


import LoginPage from './slices/auth/presentation/pages/LoginPage';
import PublicationsPage from './slices/publications/presentation/pages/PublicationsPage';
import ProfilePage from './slices/profile/presentation/pages/ProfilePage';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Cargando...</div>; 
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<LoginPage />} />

            {/* Rutas protegidas */}
            <Route
              path="/publications"
              element={
                <ProtectedRoute>
                  <PublicationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Ruta por defecto */}
            <Route
              path="/"
              element={<Navigate to="/login" replace />}
            />

            {/* Captura de rutas no encontradas */}
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <Navigate to="/publications" replace />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default App;