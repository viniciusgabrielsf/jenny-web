import { SignUpPage } from '../pages/sign-up';

export const signUpPageRoutes = {
  SING_UP: '/sign-up',
};

export const signUpRoutes = [
  {
    path: signUpPageRoutes.SING_UP,
    element: <SignUpPage />,
  },
];
