import { apiClient } from '@/api/client';
import type { IListOptions } from '@/api/interfaces';

export type PaymentsFilter = {
  userId: string;
  date: string;
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

export type PaymentsListResponse = {
  items: Payment[];
  total: number;
};

export const paymentsEndpoints = {
  GET_PAYMENTS: '/payments/me',
};

export const paymentsClient = {
  getMyPayments: async (request: IListOptions<PaymentsFilter>): Promise<PaymentsListResponse> =>
    apiClient
      .get<PaymentsListResponse>(paymentsEndpoints.GET_PAYMENTS, { params: request })
      .then(response => response.data),
};
