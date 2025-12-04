import { api } from './api'

// trae un listado de todos los institutos
export const getAllInstitutes = () => api.get('/institutos');
// trae solo los institutos de la persona
export const getInstitutos = () => api.get('/users/institutos');

export const getAllDocentes = () => api.get('/users/docentes');