import api from './api';

export const getTheaters = async () => {
  const response = await api.get('/theaters');
  return response.data;
};

export const createTheater = async (payload) => {
  const response = await api.post('/theaters', payload);
  return response.data;
};
