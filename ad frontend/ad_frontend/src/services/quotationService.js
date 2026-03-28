import api from './api';

export const createQuotation = async (payload) => {
  const response = await api.post('/quotations', payload);
  return response.data;
};
