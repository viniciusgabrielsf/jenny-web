import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

export const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: import.meta.env.VITE_TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});

const buildRequestWithAccessToken = (config: InternalAxiosRequestConfig, token: string) => {
  config.headers.Authorization = token;
  return config;
};

const authenticationInterceptor = (config: InternalAxiosRequestConfig) => {
  const accessToken = false; // TODO build access token when we have authentication

  return !accessToken ? config : buildRequestWithAccessToken(config, accessToken);
};

apiClient.interceptors.request.use(authenticationInterceptor, error => Promise.reject(error));
