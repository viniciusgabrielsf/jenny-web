import { apiClient } from '@/api/client';

export type SignUpRequest = {
  fullName: string;
  email: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
};

export const signUpEndpoints = {
  SING_UP: '/users',
};

export const signUpClient = {
  signUp: async (request: SignUpRequest) => apiClient.post(signUpEndpoints.SING_UP, request),
};
