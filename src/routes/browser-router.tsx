import { authLoader } from '@/features/auth/loaders/auth-loader';
import { createBrowserRouter, Navigate } from 'react-router';
import { publicRoutes } from './public-routes';
import { ProtectedRoutes } from '@/features/auth/components/protected-routes';
import { protectedRoutes } from './protected-routes';
import { PublicRoutes } from '@/features/auth/components/public-routes';
import { landingPageRoutes } from '@/features/landing/routes/landing';
import { profilePageRoutes } from '@/features/profile/routes/profile';

export const router = createBrowserRouter([
  {
    path: '/',
    loader: authLoader,
    children: [
      {
        element: <PublicRoutes />,
        children: [{ index: true, element: <Navigate replace to={landingPageRoutes.LANDING} /> }, ...publicRoutes],
      },
      {
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <Navigate replace to={profilePageRoutes.PROFILE} /> }, ...protectedRoutes],
      },
      {
        path: '*',
        element: <>404! page not found!</>,
      },
    ],
  },
]);
