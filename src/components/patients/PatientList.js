// src/components/patients/PatientList.js
import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Typography, CircularProgress, Box, Button
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getPatients, deletePatient } from '../../services/patientService';

const PatientList = ({ onEdit }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await getPatients();
      setPatients(response.data);
    } catch (error) {
      console.error('Erreur chargement patients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce patient ?')) {
      try {
        await deletePatient(id);
        fetchPatients();
      } catch (error) {
        console.error('Erreur suppression:', error);
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!patients.length) {
    return <Typography>Aucun patient trouvé.</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Race</TableCell>
            <TableCell>Date de naissance</TableCell>
            <TableCell>Poids (kg)</TableCell>
            <TableCell>Sexe</TableCell>
            <TableCell>Propriétaire</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map(patient => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.animal_type}</TableCell>
              <TableCell>{patient.breed}</TableCell>
              <TableCell>{patient.birth_date}</TableCell>
              <TableCell>{patient.weight}</TableCell>
              <TableCell>{patient.sex === 'M' ? 'Mâle' : 'Femelle'}</TableCell>
              <TableCell>{patient.owner ? `${patient.owner.first_name} ${patient.owner.last_name}` : 'N/A'}</TableCell>
              <TableCell align="center">
                <IconButton color="primary" onClick={() => onEdit(patient.id)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(patient.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PatientList;
