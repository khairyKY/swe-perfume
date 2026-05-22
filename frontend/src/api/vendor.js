import apiClient from './client';

export const createVendorProduct = async (payload, isMultipart = false) => {
  const headers = isMultipart ? { 'Content-Type': 'multipart/form-data' } : {};
  const response = await apiClient.post('/api/vendor/products', payload, {
    headers,
  });
  return response.data;
};

export const bulkCreateProducts = async (payload) => {
  const response = await apiClient.post('/api/vendor/products/bulk', payload);
  return response.data;
};

export const updateVendorProduct = async (id, payload, isMultipart = false) => {
  const headers = isMultipart ? { 'Content-Type': 'multipart/form-data' } : {};
  const response = await apiClient.put(`/api/vendor/products/${id}`, payload, {
    headers,
  });
  return response.data;
};

export const deleteVendorProduct = async (id) => {
  const response = await apiClient.delete(`/api/vendor/products/${id}`);
  return response.data;
};

export const fetchVendorOrders = async () => {
  const response = await apiClient.get('/api/vendor/orders');
  return response.data;
};

export const updateVendorOrderStatus = async (id, payload) => {
  const response = await apiClient.put(
    `/api/vendor/orders/${id}/status`,
    payload,
  );
  return response.data;
};
