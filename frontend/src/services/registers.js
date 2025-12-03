import { api } from './api';

export const newRegister = (data) => api.post('/registros', data);

export const asignarProfesor = (id) => api.post(`/institutos/${id}/asignar`);