// src/components/owners/OwnerList.js
import React, { useEffect, useState } from 'react';
import { getOwners, deleteOwner } from '../../services/ownerService';


import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Typography, Button, CircularProgress, Box 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const OwnerList = ({ onEdit }) => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOwners = async () => {
    try {
      setLoading(true);
      const response = await getOwners();
      setOwners(response.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des propriétaires.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce propriétaire ?')) return;
    try {
      await deleteOwner(id);
      setOwners((prev) => prev.filter(owner => owner.id !== id));
    } catch {
      alert('Vous etes pas autoriser de faire cette action.');
    }
  };

  if (loading) return <Box textAlign="center" p={2}><CircularProgress /></Box>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (owners.length === 0) return <Typography>Aucun propriétaire trouvé.</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="liste des propriétaires">
        <TableHead>
          <TableRow>
            <TableCell>Prénom</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Adresse</TableCell>
            <TableCell>Téléphone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {owners.map((owner) => (
            <TableRow key={owner.id}>
              <TableCell>{owner.first_name}</TableCell>
              <TableCell>{owner.last_name}</TableCell>
              <TableCell>{owner.address}</TableCell>
              <TableCell>{owner.phone}</TableCell>
              <TableCell>{owner.email}</TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => onEdit(owner)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(owner.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OwnerList;
