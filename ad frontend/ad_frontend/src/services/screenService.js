import api from './api';

export const createScreen = async (payload) => {
  const response = await api.post('/screens', payload);
  return response.data;
};
