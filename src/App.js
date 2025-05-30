import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';

import { AuthProvider } from './contexts/AuthContext';
import useAuth from './hooks/useAuth';

import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes';

const Layout = () => {
  const { user } = useAuth();

  // Si utilisateur non connecté, on affiche seulement les routes (dont Login)
  if (!user) return <AppRoutes />;

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flex: 1 }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <AppRoutes />
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;
