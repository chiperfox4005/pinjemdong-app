import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const getProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export default api;
