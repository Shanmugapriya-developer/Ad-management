import axios from 'axios';

export const API = "https://ad-management-sztd.onrender.com";

const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adms_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK' || !error.response) {
      return Promise.reject(new Error('Server not reachable'));
    }

    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      'Request failed';

    const normalizedError = new Error(message);
    normalizedError.response = error.response;
    normalizedError.status = error.response?.status;

    return Promise.reject(normalizedError);
  }
);

export default api;
