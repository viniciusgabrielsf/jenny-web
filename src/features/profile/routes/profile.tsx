import { ProfilePage } from '../pages/profile';

export const profilePageRoutes = {
  PROFILE: '/profile',
};

export const profileRoutes = [
  {
    path: profilePageRoutes.PROFILE,
    element: <ProfilePage />,
  },
];
