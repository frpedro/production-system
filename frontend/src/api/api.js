import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Raw Materials
export const fetchRawMaterials = () => api.get('api/raw-materials');
export const createRawMaterial = (data) => api.post('api/raw-materials', data);
export const updateRawMaterial = (id, data) => api.put(`api/raw-materials/${id}`, data);
export const deleteRawMaterial = (id) => api.delete(`api/raw-materials/${id}`);

// Products
export const fetchProducts = () => api.get('api/products');
export const fetchProductById = (id) => api.get(`api/products/${id}`);
export const createProduct = (data) => api.post('api/products', data);
export const updateProduct = (id, data) => api.put(`api/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`api/products/${id}`);

// Production
export const fetchProductionSuggestions = () => api.get('api/production/suggestions');

export default api;