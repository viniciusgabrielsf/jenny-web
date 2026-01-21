import { userClient } from '../api/user-client';
import { useAuthStore } from '../stores/auth-store';
import { useUserStore } from '../stores/user-store';

export const authLoader = async () => {
  try {
    const user = await userClient.me();
    if (user) {
      useAuthStore.getState().setIsAuthenticated(true);
      useUserStore.getState().setUser({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        birthDate: new Date(user.birthDate),
      });
    }
  } catch (error) {
    useAuthStore.getState().setIsAuthenticated(false);
    useUserStore.getState().setUser(null);
    return null;
  }
};
