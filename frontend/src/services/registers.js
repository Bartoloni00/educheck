import { api } from './api';

export const createRegistro = async (data) => {
  const response = await api.post("/registros", data);
  return response.data;
};

export const getAllRegistros = () => api.get('/registros/hoy');
export const asignarProfesor = (id) => api.post(`/institutos/${id}/asignar`);