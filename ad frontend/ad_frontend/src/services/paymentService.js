import api from './api';

export const createPayment = async (payload) => {
  const response = await api.post('/payments', payload);
  return response.data;
};
