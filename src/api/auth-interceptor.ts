import { type AxiosInstance, type AxiosError } from 'axios';
import { authEndpoints, authClient } from '@/features/auth/api/auth-client';
import { useAuthStore } from '@/features/auth/stores/auth-store';
import { useUserStore } from '@/features/auth/stores/user-store';

type FailedRequest = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};

export const createRefreshTokenInterceptor = (apiClient: AxiosInstance) => {
  let isRefreshing = false;
  let failedRequestsQueue: FailedRequest[] = [];

  const processQueue = (error: AxiosError | null) => {
    failedRequestsQueue.forEach(request => {
      if (error) request.reject(error);
      else request.resolve();
    });
    failedRequestsQueue = [];
  };

  const logout = () => {
    useAuthStore.getState().setIsAuthenticated(false);
    useUserStore.getState().setUser(null);
  };

  return async (error: AxiosError) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isUnauthorized = error.response?.status === 401;
    const isRefreshRequest = originalRequest.url === authEndpoints.REFRESH;
    const isLogoutRequest = originalRequest.url === authEndpoints.LOG_OUT;

    // Don't retry refresh or logout requests
    if (!isUnauthorized || isRefreshRequest || isLogoutRequest) {
      return Promise.reject(error);
    }

    // If already refreshing, queue the request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({ resolve, reject });
      }).then(() => apiClient(originalRequest));
    }

    isRefreshing = true;

    try {
      await authClient.refresh();
      processQueue(null);
      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError as AxiosError);
      logout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  };
};
