import { apiClient } from '@/api/client';
import type { IListOptions } from '@/api/interfaces';

export type TeamPaymentsFilter = {
  userId: string;
  date: string;
};

export type TeamPayment = {
  id: string;
  userId: string;
  title: string;
  amount: number;
  paymentDate: string;
  category: string;
  status: string;
};

export type TeamPaymentsListResponse = {
  items: TeamPayment[];
  total: number;
};

export const teamPaymentsEndpoints = {
  GET_PAYMENTS: '/payments/me',
};

export const teamPaymentsClient = {
  getMyTeamPayments: async (request: IListOptions<TeamPaymentsFilter>): Promise<TeamPaymentsListResponse> =>
    apiClient
      .get<TeamPaymentsListResponse>(teamPaymentsEndpoints.GET_PAYMENTS, { params: request })
      .then(response => response.data),
};
