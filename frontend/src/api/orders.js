import apiClient from './client';

export const createOrder = async (payload) => {
  const response = await apiClient.post('/api/orders', payload);
  return response.data;
};

export const fetchMyOrders = async () => {
  const response = await apiClient.get('/api/orders/my-orders');
  return response.data;
};

export const fetchOrderById = async (id) => {
  const response = await apiClient.get(`/api/orders/${id}`);
  return response.data;
};
