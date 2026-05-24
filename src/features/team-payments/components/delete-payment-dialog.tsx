import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/dialog';
import { Button } from '@/components/button';
import type { TeamPayment } from '../api/team-payments-client';
import { useDeletePayment } from '../hooks/use-delete-payment';

type Props = {
  teamId: string;
  payment: TeamPayment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const DeletePaymentDialog = ({ teamId, payment, open, onOpenChange }: Props) => {
  if (!payment) return null;

  const { deletePayment } = useDeletePayment(teamId, () => onOpenChange(false));

  const onSubmitDelete = () => {
    deletePayment.mutate(payment.id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Deletar pagamento</DialogTitle>
          <DialogDescription className="text-sm">
            Tem certeza que deseja deletar <strong>{payment.title}</strong>? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 justify-end pt-4">
          <Button variant="outline" disabled={deletePayment.isPending} onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" disabled={deletePayment.isPending} onClick={onSubmitDelete}>
            {deletePayment.isPending ? 'Deletando...' : 'Deletar pagamento'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
