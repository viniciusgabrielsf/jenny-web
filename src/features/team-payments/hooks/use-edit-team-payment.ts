import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { teamPaymentsClient, type EditTeamPaymentRequest } from '../api/team-payments-client';

export const useEditTeamPayment = (teamId: string, onClose?: () => void) => {
  const queryClient = useQueryClient();

  const editPaymentMutation = useMutation({
    mutationKey: ['edit-payment'],
    mutationFn: async (request: EditTeamPaymentRequest) => {
      toast.loading('Editando pagamento...', { id: 'edit-payment-loading' });

      return teamPaymentsClient.editPayment(teamId, request);
    },
    onSuccess: () => {
      toast.dismiss('edit-payment-loading');
      toast.success('Pagamento editado com sucesso!', { id: 'edit-payment-success' });
      queryClient.invalidateQueries({ queryKey: ['team-payments'] });
      onClose?.();
    },
    onError: (error: Error) => {
      toast.dismiss('edit-payment-loading');
      toast.error(`Erro ao editar pagamento: ${error.message}`, { id: 'edit-payment-error' });
    },
  });

  return {
    editPayment: editPaymentMutation,
  };
};
