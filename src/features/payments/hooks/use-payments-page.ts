import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@features/auth/stores/user-store';
import { paymentsClient } from '../api/payments-client';

export const usePaymentsPage = () => {
  const user = useUserStore(state => state.user);

  const trasactionsQuery = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      return paymentsClient.getMyPayments({ filter: { userId: user?.id } });
    },
    initialData: [],
  });

  return {
    payments: trasactionsQuery,
  };
};
