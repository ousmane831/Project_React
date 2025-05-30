import React, { useEffect, useState } from 'react';
import {
  TextField, Button, MenuItem, Box, Typography, Paper, CircularProgress
} from '@mui/material';
import { createPatient, updatePatient, getPatient } from '../../services/patientService';
import { getOwners } from '../../services/ownerService';

const ANIMAL_TYPES = [
  { value: 'CAT', label: 'Chat' },
  { value: 'DOG', label: 'Chien' },
  { value: 'RABBIT', label: 'Lapin' },
];

const SEX_CHOICES = [
  { value: 'M', label: 'Mâle' },
  { value: 'F', label: 'Femelle' },
];

const PatientForm = ({ patientId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    animal_type: '',
    breed: '',
    birth_date: '',
    weight: '',
    sex: '',
    owner: '',
  });

  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOwners = async () => {
    try {
      const response = await getOwners();
      setOwners(response.data);
    } catch (err) {
      console.error('Erreur chargement propriétaires:', err);
      setError('Impossible de charger la liste des propriétaires.');
    }
  };

  const fetchPatient = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPatient(id);
      setFormData({
        name: response.data.name || '',
        animal_type: response.data.animal_type || '',
        breed: response.data.breed || '',
        birth_date: response.data.birth_date || '',
        weight: response.data.weight || '',
        sex: response.data.sex || '',
        owner: response.data.owner || '',
      });
    } catch (err) {
      console.error('Erreur chargement patient:', err);
      setError('Erreur lors du chargement du patient.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwners();
    if (patientId) {
      fetchPatient(patientId);
    }
  }, [patientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.animal_type || !formData.owner) {
      setError("Nom, type d'animal et propriétaire sont obligatoires.");
      return;
    }

    try {
      const payload = {
        ...formData,
        weight: formData.weight === '' ? null : Number(formData.weight),
      };

      if (patientId) {
        await updatePatient(patientId, payload);
      } else {
        await createPatient(payload);
      }
      onSuccess();
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      const msg = err.response?.data?.detail || 'Erreur lors de la sauvegarde. Vérifiez les données.';
      setError(msg);
    }
  };

  if (loading) {
    return (
      <Paper sx={{ p: 3, mt: 2, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Chargement en cours...
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        {patientId ? 'Modifier un patient' : 'Ajouter un patient'}
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          label="Nom"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          select
          label="Type d'animal"
          name="animal_type"
          value={formData.animal_type}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          {ANIMAL_TYPES.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Race"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date de naissance"
          name="birth_date"
          type="date"
          value={formData.birth_date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Poids (kg)"
          name="weight"
          type="number"
          value={formData.weight}
          onChange={handleChange}
          fullWidth
          margin="normal"
          inputProps={{ step: '0.1', min: 0 }}
        />
        <TextField
          select
          label="Sexe"
          name="sex"
          value={formData.sex}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {SEX_CHOICES.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Propriétaire"
          name="owner"
          value={formData.owner}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          {owners.map(owner => (
            <MenuItem key={owner.id} value={owner.id}>
              {owner.first_name} {owner.last_name}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            {patientId ? 'Mettre à jour' : 'Ajouter'}
          </Button>
          <Button variant="outlined" color="secondary" onClick={onCancel}>
            Annuler
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default PatientForm;
