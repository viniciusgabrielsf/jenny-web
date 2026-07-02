import { apiClient } from '@/api/client';
import type { IListOptions } from '@/api/interfaces';
import type { TeamMember } from '@/features/teams/api/teams-client';

export type TeamPaymentsFilter = {
  payerId: string;
  date: string;
};

export type TeamPayment = {
  id: string;
  teamId: string;
  payerId: string;
  payer: TeamMember;
  debtorsIds: string[];
  debtors: TeamMember[];
  title: string;
  amount: number;
  paymentDate: string;
};

export type Balance = {
  from: TeamMember;
  to: TeamMember;
  amount: number;
};

export type TeamPaymentsListResponse = {
  items: TeamPayment[];
  total: number;
  balances: Balance[];
};

export type CreateTeamPaymentRequest = {
  payerId: string;
  debtorsIds: string[];
  title: string;
  amount: number;
};

export type EditTeamPaymentRequest = CreateTeamPaymentRequest & {
  paymentId: string;
};

export const teamPaymentsEndpoints = {
  GET_PAYMENTS: (teamId: string) => `/teams/${teamId}/payments`,
  CREATE_PAYMENT: (teamId: string) => `/teams/${teamId}/payments`,
  EDIT_PAYMENT: (teamId: string, paymentId: string) => `/teams/${teamId}/payments/${paymentId}`,
  DELETE_PAYMENT: (teamId: string, paymentId: string) => `/teams/${teamId}/payments/${paymentId}`,
};

export const teamPaymentsClient = {
  getMyTeamPayments: async (
    teamId: string,
    request: IListOptions<TeamPaymentsFilter>
  ): Promise<TeamPaymentsListResponse> =>
    apiClient
      .get<TeamPaymentsListResponse>(teamPaymentsEndpoints.GET_PAYMENTS(teamId), { params: request })
      .then(response => response.data),
  createPayment: async (teamId: string, request: CreateTeamPaymentRequest): Promise<TeamPayment> =>
    apiClient.post<TeamPayment>(teamPaymentsEndpoints.CREATE_PAYMENT(teamId), request).then(response => response.data),
  editPayment: async (teamId: string, request: EditTeamPaymentRequest): Promise<TeamPayment> =>
    apiClient
      .patch<TeamPayment>(teamPaymentsEndpoints.EDIT_PAYMENT(teamId, request.paymentId), request)
      .then(response => response.data),
  deletePayment: async (teamId: string, paymentId: string): Promise<void> =>
    apiClient.delete(teamPaymentsEndpoints.DELETE_PAYMENT(teamId, paymentId)).then(() => undefined),
};
