import { apiClient } from '@/api/client';
import type { IListOptions } from '@/api/interfaces';

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
  avatar?: string;
};

export type UserListResponse = {
  items: UserResponse[];
  total: number;
};

export type UserFilter = {
  teamId?: string;
  search?: string;
};

export const userEndpoints = {
  SIGN_UP: '/users',
  ME: '/users/me',
  USERS: '/users',
};

export const userClient = {
  signUp: async (request: SignUpRequest) => apiClient.post(userEndpoints.SIGN_UP, request),
  me: async (): Promise<UserResponse> => apiClient.get<UserResponse>(userEndpoints.ME).then(response => response.data),
  users: async (request: IListOptions<UserFilter>): Promise<UserListResponse> =>
    apiClient.get<UserListResponse>(userEndpoints.USERS, { params: request }).then(response => response.data),
};
