import axios from 'axios';

const api = axios.create({
  baseURL: 'https://personal-finance-api-wine.vercel.app/api/v1', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
