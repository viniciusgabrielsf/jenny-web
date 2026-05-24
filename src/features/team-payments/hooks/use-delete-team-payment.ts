import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { teamPaymentsClient } from '../api/team-payments-client';

export const useDeleteTeamPayment = (teamId: string, onClose?: () => void) => {
  const queryClient = useQueryClient();

  const deletePaymentMutation = useMutation({
    mutationKey: ['delete-team-payment'],
    mutationFn: async (paymentId: string) => {
      toast.loading('Excluindo pagamento...', { id: 'delete-team-payment-loading' });

      return teamPaymentsClient.deletePayment(teamId, paymentId);
    },
    onSuccess: () => {
      toast.dismiss('delete-team-payment-loading');
      toast.success('Pagamento excluído com sucesso!', { id: 'delete-team-payment-success' });
      queryClient.invalidateQueries({ queryKey: ['team-payments'] });
      onClose?.();
    },
    onError: (error: Error) => {
      toast.dismiss('delete-team-payment-loading');
      toast.error(`Erro ao excluir pagamento: ${error.message}`, { id: 'delete-team-payment-error' });
    },
  });

  return {
    deletePayment: deletePaymentMutation,
  };
};
