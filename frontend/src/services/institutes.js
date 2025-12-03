import { api } from './api'

export const getAllInstitutes = () => api.get('/users/institutos');

export const getAllDocentes = () => api.get('/users/docentes');