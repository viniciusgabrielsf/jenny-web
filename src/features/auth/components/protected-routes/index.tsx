import { Navigate, Outlet } from 'react-router';
import { landingPageRoutes } from '../../../landing/routes';

export const ProtectedRoutes = () => {
  const isAuthenticated = false; // TODO Replace with actual authentication logic

  if (!isAuthenticated) {
    return <Navigate replace to={landingPageRoutes.LANDING} />;
  }

  return <Outlet />;
};
