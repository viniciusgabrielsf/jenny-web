import { profileRoutes } from '@/features/profile/routes/profile';
import { paymentsRoutes } from '@/features/payments/routes/payments';

export const protectedRoutes = [...profileRoutes, ...paymentsRoutes];
