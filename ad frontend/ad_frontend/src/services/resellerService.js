import api from './api';

export const buyAds = async (payload) => {
  const response = await api.post('/resellers/buy', payload);
  return response.data;
};

export const sellAds = async (payload) => {
  const response = await api.post('/resellers/sell', payload);
  return response.data;
};
