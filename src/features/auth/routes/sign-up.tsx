import { SignUpPage } from '../pages/sign-up';

export const signUpPageRoutes = {
  SIGN_UP: '/sign-up',
};

export const signUpRoutes = [
  {
    path: signUpPageRoutes.SIGN_UP,
    element: <SignUpPage />,
  },
];
