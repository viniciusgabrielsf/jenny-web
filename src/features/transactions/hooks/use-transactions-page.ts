import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@features/auth/stores/user-store';
import { transactionsClient } from '../api/transactions-client';

export const useTransactionsPage = () => {
  const user = useUserStore(state => state.user);

  const trasactionsQuery = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      return transactionsClient.getMyTransactions({ filter: { userId: user?.id } });
    },
    initialData: [],
  });

  return {
    transactions: trasactionsQuery,
  };
};
