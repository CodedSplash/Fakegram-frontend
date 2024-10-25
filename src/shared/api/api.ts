import axios from 'axios';

const baseURL = process.env.BASE_BACKEND_URL;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
