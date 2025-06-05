import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: 'center',
        backgroundColor: '#000', // fond noir
        color: '#fff',           // texte blanc
        borderTop: '1px solid #333', // bordure plus discrète
      }}
    >
      <Typography variant="body2">
        © 2025 Clinique Vétérinaire - Tous droits réservés.
      </Typography>
    </Box>
  );
};

export default Footer;
