import { signUpRoutes } from '@features/auth/routes/sign-up';
import { landingRoutes } from '@/features/landing/routes/landing';
import { logInRoutes } from '@/features/auth/routes/log-in';

export const publicRoutes = [...landingRoutes, ...signUpRoutes, ...logInRoutes];
