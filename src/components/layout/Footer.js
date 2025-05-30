// src/components/layout/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: 'center',
        backgroundColor: 'background.paper',
        borderTop: '1px solid #ddd',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2025 Clinique Vétérinaire - Tous droits réservés.
      </Typography>
    </Box>
  );
};

export default Footer;
