import { signUpRoutes } from '@features/auth/routes/sign-up';
import { landingRoutes } from '@/features/landing/routes/landing';

export const publicRoutes = [...landingRoutes, ...signUpRoutes];
