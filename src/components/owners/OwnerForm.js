// src/components/owners/OwnerForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

const initialForm = {
  first_name: '',
  last_name: '',
  address: '',
  phone: '',
  email: '',
};

const OwnerForm = ({ ownerToEdit, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (ownerToEdit) {
      setFormData(ownerToEdit);
    } else {
      setFormData(initialForm);
    }
  }, [ownerToEdit]);

  const validate = () => {
    let temp = {};
    temp.first_name = formData.first_name ? '' : 'Le prénom est requis.';
    temp.last_name = formData.last_name ? '' : 'Le nom est requis.';
    temp.address = formData.address ? '' : 'L’adresse est requise.';
    temp.phone = formData.phone ? '' : 'Le téléphone est requis.';
    temp.email = /^\S+@\S+\.\S+$/.test(formData.email) ? '' : 'Email invalide.';
    setErrors(temp);
    return Object.values(temp).every(x => x === '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {ownerToEdit ? 'Modifier le propriétaire' : 'Ajouter un propriétaire'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Prénom"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          error={!!errors.first_name}
          helperText={errors.first_name}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Nom"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          error={!!errors.last_name}
          helperText={errors.last_name}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Adresse"
          name="address"
          value={formData.address}
          onChange={handleChange}
          error={!!errors.address}
          helperText={errors.address}
          fullWidth
          margin="normal"
          multiline
          minRows={2}
          required
        />
        <TextField
          label="Téléphone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          margin="normal"
          required
        />
        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button variant="outlined" color="secondary" onClick={onCancel}>
            Annuler
          </Button>
          <Button variant="contained" color="primary" type="submit">
            {ownerToEdit ? 'Mettre à jour' : 'Ajouter'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default OwnerForm;
