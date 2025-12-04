import { api } from './api'

export const createAusencia = (data) => api.post('/ausencias', data);

export const getAllAusencias = () => api.get('/ausencias');