import { api } from './api'

// Auth
// Login
export const loginRequest = (email, password) => api.post("/auth/login", { email, password });
// Register
export const registerRequest = (data) => api.post("/auth/register", data);

export const getAllNotifications = () => api.get('/notificaciones');

// Sacar a docente de instituto
export const removeInstituto = async (id) => {
  const response = await api.post(`/institutos/${id}/desasignar`);

  console.log("⬅️ Respuesta cruda remover:", response);
  return response.data;
};

// Agregar docente a instituto
export const agregarInstituto = async (id) => {
  const response = await api.post(`/institutos/${id}/asignar`);

  console.log("⬅️ Respuesta cruda agregar:", response);
  return response.data;
};

export const updateAusencia = async (id, estado) => {
  const body = {
    estado,
    respuestaInstituto: "Actualizado desde panel",
  };

  const response = await api.put(`/ausencias/${id}`, body);
  return response.data;
};