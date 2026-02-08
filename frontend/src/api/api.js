import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Raw Materials
export const fetchRawMaterials = () => api.get('/raw-materials');
export const createRawMaterial = (data) => api.post('/raw-materials', data);
export const updateRawMaterial = (id, data) => api.put(`/raw-materials/${id}`, data);
export const deleteRawMaterial = (id) => api.delete(`/raw-materials/${id}`);

// Products
export const fetchProducts = () => api.get('/products');
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Production
export const fetchProductionSuggestions = () => api.get('/production/suggestions');

export default api;