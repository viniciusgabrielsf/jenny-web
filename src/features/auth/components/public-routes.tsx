import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../stores/auth-store';
import { profilePageRoutes } from '@/features/profile/routes/profile';

export const PublicRoutes = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (isAuthenticated) {
    // TODO redirect to home
    return <Navigate replace to={profilePageRoutes.PROFILE} />;
  }

  return <Outlet />;
};
