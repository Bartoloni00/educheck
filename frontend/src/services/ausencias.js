import { api } from './api'

export const createAusencia = (data) => api.post('/ausencias', data);