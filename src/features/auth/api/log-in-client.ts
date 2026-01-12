import { apiClient } from '@/api/client';

export type LogInRequest = {
  email: string;
  password: string;
};

export const logInEndpoints = {
  LOG_IN: '/auth',
};

export const logInClient = {
  logIn: async (request: LogInRequest) => apiClient.post(logInEndpoints.LOG_IN, request),
};
