// src/pages/Owners.js
import React, { useState } from 'react';
import OwnerList from '../components/owners/OwnerList';
import OwnerForm from '../components/owners/OwnerForm';
import OwnerDetail from '../components/owners/OwnerDetail';
import { createOwner, updateOwner } from '../services/ownerService';
import { Container, Typography, Box } from '@mui/material';

export default function Owners() {
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [editingOwner, setEditingOwner] = useState(null);

  const handleEdit = (owner) => {
    setEditingOwner(owner);
    setSelectedOwner(owner);
  };

  const handleCancel = () => {
    setEditingOwner(null);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (editingOwner) {
        await updateOwner(editingOwner.id, data);
        alert('Propriétaire mis à jour.');
      } else {
        await createOwner(data);
        alert('Propriétaire ajouté.');
      }
      setEditingOwner(null);
      // For simplicity, reload the page or improve: refetch owners list
      window.location.reload();
    } catch (error) {
      alert('Erreur lors de la sauvegarde.');
      console.error(error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gestion des propriétaires
      </Typography>

      <OwnerForm
        ownerToEdit={editingOwner}
        onSubmit={handleFormSubmit}
        onCancel={handleCancel}
      />

      <OwnerList onEdit={handleEdit} />

      <Box mt={4}>
        <OwnerDetail owner={selectedOwner} />
      </Box>
    </Container>
  );
}
