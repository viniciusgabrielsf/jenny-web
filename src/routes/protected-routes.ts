import { profileRoutes } from '@/features/profile/routes/profile';
import { paymentsRoutes } from '@/features/payments/routes/payments';
import { teamsRoutes } from '@/features/teams/routes/teams';

export const protectedRoutes = [...profileRoutes, ...paymentsRoutes, ...teamsRoutes];
