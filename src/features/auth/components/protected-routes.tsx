import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../stores/auth-store';
import { logInPageRoutes } from '../routes/log-in';

export const ProtectedRoutes = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate replace to={logInPageRoutes.LOG_IN} />;
  }

  return <Outlet />;
};
