import { api } from './api'

export const createAusencia = async (data) => {
  try {
    const response = await api.post('/ausencias', data);
    return response.data;
  } catch (error) {
    console.error("Error en createAusencia:", error);
    throw error;
  }
};


export const getAllAusencias = () => api.get('/ausencias');