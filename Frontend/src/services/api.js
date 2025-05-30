import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors (e.g., token expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const login = (credentials) => api.post('/login', credentials);
export const getFiscalias = () => api.get('/fiscalias');
export const createFiscalia = (data) => api.post('/fiscalias', data);
export const updateFiscalia = (id, data) => api.put(`/fiscalias/${id}`, data);
export const deleteFiscalia = (id) => api.delete(`/fiscalias/${id}`);
export const getEstadosCaso = () => api.get('/estados-caso');
export const createEstadoCaso = (data) => api.post('/estados-caso', data);
export const updateEstadoCaso = (id, data) => api.put(`/estados-caso/${id}`, data);
export const deleteEstadoCaso = (id) => api.delete(`/estados-caso/${id}`);
export const getUsuarios = () => api.get('/usuarios');
export const createUsuario = (data) => api.post('/usuarios', data);
export const updateUsuario = (id, data) => api.put(`/usuarios/${id}`, data);
export const deleteUsuario = (id) => api.delete(`/usuarios/${id}`);
export const getFiscales = () => api.get('/fiscales');
export const createFiscal = (data) => api.post('/fiscales', data);
export const updateFiscal = (id, data) => api.put(`/fiscales/${id}`, data);
export const deleteFiscal = (id) => api.delete(`/fiscales/${id}`);
export const getCasos = () => api.get('/casos');
export const createCaso = (data) => api.post('/casos', data);
export const updateCaso = (id, data) => api.put(`/casos/${id}`, data);
export const deleteCaso = (id) => api.delete(`/casos/${id}`);
export const asignarFiscalCaso = (id, data) => api.post(`/casos/${id}/asignar-fiscal`, data);
export const reasignarFiscalCaso = (id, data) => api.post(`/casos/${id}/reasignar-fiscal`, data);
export const getLogsReasignacion = () => api.get('/logs-reasignacion');
export const getLogReasignacion = (id) => api.get(`/logs-reasignacion/${id}`);

export default api;