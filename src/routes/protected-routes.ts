import { profileRoutes } from '@/features/profile/routes/profile';
import { transactionsRoutes } from '@/features/transactions/routes/transactions';

export const protectedRoutes = [...profileRoutes, ...transactionsRoutes];
