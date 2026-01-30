import { apiClient } from '@/api/client';

export type profileRequest = {
  fullName: string;
  email: string;
  birthDate: string;
  avatar?: string;
};

export type PasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export const profileEndpoints = {
  UPDATE_PROFILE: '/users/me',
  UPDATE_PASSWORD: '/users/me/password',
};

export const profileClient = {
  updateProfile: async (request: profileRequest): Promise<void> =>
    apiClient.patch<void>(profileEndpoints.UPDATE_PROFILE, request).then(response => response.data),
  updatePassword: async (request: PasswordRequest): Promise<void> =>
    apiClient.patch<void>(profileEndpoints.UPDATE_PASSWORD, request).then(response => response.data),
};
