// src/components/layout/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Clinique Vétérinaire
        </Typography>
        {user && (
          <Typography sx={{ marginRight: 2 }}>
            {user.email} ({user.role})
          </Typography>
        )}
        {user && (
          <Button color="inherit" onClick={logout}>
            Déconnexion
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
