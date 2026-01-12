import { LogInPage } from '../pages/log-in';

export const logInPageRoutes = {
  LOG_IN: '/log-in',
};

export const logInRoutes = [
  {
    path: logInPageRoutes.LOG_IN,
    element: <LogInPage />,
  },
];
