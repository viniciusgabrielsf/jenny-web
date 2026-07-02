import { profileRoutes } from '@/features/profile/routes/profile';
import { paymentsRoutes } from '@/features/payments/routes/payments';
import { teamsRoutes } from '@/features/teams/routes/teams';
import { teamPaymentsRoutes } from '@/features/team-payments/routes/team-payments';
export const protectedRoutes = [...profileRoutes, ...paymentsRoutes, ...teamsRoutes, ...teamPaymentsRoutes];
