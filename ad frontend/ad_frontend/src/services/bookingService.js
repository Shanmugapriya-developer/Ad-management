import api from './api';

export const getBookings = async () => {
  const response = await api.get('/bookings');
  return response.data;
};

export const createBooking = async (payload) => {
  const response = await api.post('/bookings', payload);
  return response.data;
};
