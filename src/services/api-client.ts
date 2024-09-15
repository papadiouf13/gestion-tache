import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;
const timeout = import.meta.env.TIMEOUT || 5000;

const apiClient = axios.create({
    baseURL,
    timeout,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  export interface RestResponse<T> {
    token: string;
    message: string;
    status: string;
    results: T
  }

export default apiClient;
