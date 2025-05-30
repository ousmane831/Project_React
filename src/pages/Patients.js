// src/components/patients/Patients.js
import React, { useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import PatientList from '../components/patients/PatientList';
import PatientForm from '../components/patients/PatientForm';
import PatientDetail from '../components/patients/PatientDetail';


const Patients = () => {
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [mode, setMode] = useState('list'); // 'list' | 'detail' | 'form'

  const handleEdit = (id) => {
    setSelectedPatientId(id);
    setMode('form');
  };

  const handleView = (id) => {
    setSelectedPatientId(id);
    setMode('detail');
  };

  const handleAdd = () => {
    setSelectedPatientId(null);
    setMode('form');
  };

  const handleCancel = () => {
    setSelectedPatientId(null);
    setMode('list');
  };

  const handleSuccess = () => {
    setSelectedPatientId(null);
    setMode('list');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestion des Patients
      </Typography>

      {mode === 'list' && (
        <>
          <Button variant="contained" color="primary" onClick={handleAdd} sx={{ mb: 2 }}>
            Ajouter un patient
          </Button>
          <PatientList onEdit={handleEdit} onView={handleView} />
        </>
      )}

      {mode === 'form' && (
        <PatientForm
          patientId={selectedPatientId}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      )}

      {mode === 'detail' && (
        <>
          <Button onClick={handleCancel} sx={{ mb: 2 }}>
            ← Retour à la liste
          </Button>
          <PatientDetail patientId={selectedPatientId} />
        </>
      )}
    </Box>
  );
};

export default Patients;
