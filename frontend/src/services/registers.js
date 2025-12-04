import { api } from './api';

export const createRegistro = async (data) => {
  const response = await api.post("/registros", data);
  return response.data;
};

export const getRegistros = () => api.get('/registros');
export const getAllRegistros = () => api.get('/registros/hoy');
export const asignarProfesor = (id) => api.post(`/institutos/${id}/asignar`);