import apiClient from './client';

export const fetchProducts = async ({ page = 1, limit = 20 } = {}) => {
  const response = await apiClient.get('/api/products', {
    params: { page, limit },
  });
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await apiClient.get(`/api/products/${id}`);
  return response.data;
};
