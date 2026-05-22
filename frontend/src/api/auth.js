import apiClient from './client';

export const registerUser = async (payload) => {
  const response = await apiClient.post('/api/auth/register', payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await apiClient.post('/api/auth/login', payload);
  return response.data;
};

export const fetchMe = async () => {
  const response = await apiClient.get('/api/users/me');
  return response.data;
};

export const vendorApply = async (payload) => {
  const response = await apiClient.post('/api/users/vendor-apply', payload);
  return response.data;
};
