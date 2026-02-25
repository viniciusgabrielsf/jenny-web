import { apiClient } from '@/api/client';
import type { IListOptions } from '@/api/interfaces';

export type TransactionsFilter = {
  userId: string;
};

export type Transaction = {
  id: string;
  userId: string;
  title: string;
  amount: number;
  paymentDate: string;
  category: string;
  status: string;
};

export const transactionsEndpoints = {
  GET_TRANSACTIONS: '/payments/me',
};

export const transactionsClient = {
  getMyTransactions: async (request: IListOptions<TransactionsFilter>): Promise<Transaction[]> =>
    apiClient
      .get<Transaction[]>(transactionsEndpoints.GET_TRANSACTIONS, { params: request })
      .then(response => response.data),
};
