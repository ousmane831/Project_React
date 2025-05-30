// src/components/patients/PatientDetail.js
import React, { useEffect, useState } from 'react';
import { Typography, Paper, Box, CircularProgress } from '@mui/material';
import { getPatient } from '../../services/patientService';

const PatientDetail = ({ patientId }) => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPatient = async (id) => {
    setLoading(true);
    try {
      const response = await getPatient(id);
      setPatient(response.data);
    } catch (error) {
      console.error('Erreur chargement patient:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchPatient(patientId);
    }
  }, [patientId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!patient) {
    return <Typography>Patient introuvable.</Typography>;
  }

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        {patient.name}
      </Typography>
      <Typography>
        <strong>Type d'animal:</strong> {patient.animal_type}
      </Typography>
      <Typography>
        <strong>Race:</strong> {patient.breed || '-'}
      </Typography>
      <Typography>
        <strong>Date de naissance:</strong> {patient.birth_date || '-'}
      </Typography>
      <Typography>
        <strong>Poids:</strong> {patient.weight ? `${patient.weight} kg` : '-'}
      </Typography>
      <Typography>
        <strong>Sexe:</strong> {patient.sex === 'M' ? 'Mâle' : patient.sex === 'F' ? 'Femelle' : '-'}
      </Typography>
      <Typography>
        <strong>Propriétaire:</strong>{' '}
        {patient.owner ? `${patient.owner.first_name} ${patient.owner.last_name}` : '-'}
      </Typography>
    </Paper>
  );
};

export default PatientDetail;
