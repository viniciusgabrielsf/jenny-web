import axios, { type AxiosInstance } from 'axios';
import { createRefreshTokenInterceptor } from './auth-interceptor';
import { errorInterceptor } from './error-interceptor';

export const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: import.meta.env.VITE_TIMEOUT,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(response => response, createRefreshTokenInterceptor(apiClient));

apiClient.interceptors.response.use(response => response, errorInterceptor);
