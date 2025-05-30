// src/services/ownersService.js
import api from './api';

export const getOwners = () => api.get('/owners/');
export const getOwner = (id) => api.get(`/owners/${id}/`);
export const createOwner = (data) => api.post('/owners/', data);
export const updateOwner = (id, data) => api.put(`/owners/${id}/`, data);
export const deleteOwner = (id) => api.delete(`/owners/${id}/`);
