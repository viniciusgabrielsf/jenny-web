import { apiClient } from '@/api/client';
import type { IListOptions } from '@/api/interfaces';

export type PaymentsFilter = {
  userId: string;
};

export type Payment = {
  id: string;
  userId: string;
  title: string;
  amount: number;
  paymentDate: string;
  category: string;
  status: string;
};

export const paymentsEndpoints = {
  GET_PAYMENTS: '/payments/me',
};

export const paymentsClient = {
  getMyPayments: async (request: IListOptions<PaymentsFilter>): Promise<Payment[]> =>
    apiClient.get<Payment[]>(paymentsEndpoints.GET_PAYMENTS, { params: request }).then(response => response.data),
};
