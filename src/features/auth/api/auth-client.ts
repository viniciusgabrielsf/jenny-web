import { apiClient } from '@/api/client';

export type LogInRequest = {
  email: string;
  password: string;
};

export type LogInResponse = {
  id: string;
  fullName: string;
  email: string;
  birthDate: string;
};

export const authEndpoints = {
  LOG_IN: '/auth/login',
  LOG_OUT: '/auth/logout',
  REFRESH: '/auth/refresh',
};

export const authClient = {
  logIn: async (request: LogInRequest): Promise<LogInResponse> =>
    apiClient.post<LogInResponse>(authEndpoints.LOG_IN, request).then(response => response.data),
  logOut: async (): Promise<void> => apiClient.post<void>(authEndpoints.LOG_OUT).then(response => response.data),
  refresh: async (): Promise<void> => apiClient.post<void>(authEndpoints.REFRESH).then(response => response.data),
};
