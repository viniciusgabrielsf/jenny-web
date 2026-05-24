import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { teamPaymentsClient, type CreateTeamPaymentRequest } from '../api/team-payments-client';

export const useCreateTeamPayment = (teamId: string, onClose?: () => void) => {
  const queryClient = useQueryClient();

  const createPaymentMutation = useMutation({
    mutationKey: ['create-team-payment'],
    mutationFn: async (request: CreateTeamPaymentRequest) => {
      toast.loading('Criando pagamento...', { id: 'create-team-payment-loading' });

      return teamPaymentsClient.createPayment(teamId, request);
    },
    onSuccess: () => {
      toast.dismiss('create-team-payment-loading');
      toast.success('Pagamento criado com sucesso!', { id: 'create-team-payment-success' });
      queryClient.invalidateQueries({ queryKey: ['team-payments'] });
      onClose?.();
    },
    onError: (error: Error) => {
      toast.dismiss('create-team-payment-loading');
      toast.error(`Erro ao criar pagamento: ${error.message}`, { id: 'create-team-payment-error' });
    },
  });

  return {
    createPayment: createPaymentMutation,
  };
};
