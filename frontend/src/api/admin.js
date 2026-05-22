import apiClient from './client';

export const fetchApplications = async (status = 'pending') => {
  const response = await apiClient.get('/api/admin/applications', {
    params: { status },
  });
  return response.data;
};

export const approveApplication = async (id) => {
  const response = await apiClient.put(`/api/admin/applications/${id}/approve`);
  return response.data;
};

export const rejectApplication = async (id) => {
  const response = await apiClient.put(`/api/admin/applications/${id}/reject`);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await apiClient.get('/api/admin/users');
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await apiClient.delete(`/api/admin/users/${id}`);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await apiClient.delete(`/api/admin/products/${id}`);
  return response.data;
};
