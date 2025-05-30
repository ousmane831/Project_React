// src/components/owners/OwnerDetail.js
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const OwnerDetail = ({ owner }) => {
  if (!owner) return <Typography>Sélectionnez un propriétaire pour voir les détails.</Typography>;

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>Détails du propriétaire</Typography>
      <Box>
        <Typography><strong>Prénom:</strong> {owner.first_name}</Typography>
        <Typography><strong>Nom:</strong> {owner.last_name}</Typography>
        <Typography><strong>Adresse:</strong> {owner.address}</Typography>
        <Typography><strong>Téléphone:</strong> {owner.phone}</Typography>
        <Typography><strong>Email:</strong> {owner.email}</Typography>
      </Box>
    </Paper>
  );
};

export default OwnerDetail;
