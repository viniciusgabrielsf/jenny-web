import { apiClient } from '@/api/client';

export type SignUpRequest = {
  fullName: string;
  email: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
};

export type UserResponse = {
  id: string;
  fullName: string;
  email: string;
  birthDate: string;
};

export const userEndpoints = {
  SIGN_UP: '/users',
  ME: '/users/me',
};

export const userClient = {
  signUp: async (request: SignUpRequest) => apiClient.post(userEndpoints.SIGN_UP, request),
  me: async (): Promise<UserResponse> => apiClient.get<UserResponse>(userEndpoints.ME).then(response => response.data),
};
