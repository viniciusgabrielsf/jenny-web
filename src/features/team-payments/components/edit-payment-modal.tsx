import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/dialog';
import { PaymentForm } from './form/payment-form';
import { useEditTeamPayment } from '../hooks/use-edit-team-payment';
import { useUserStore } from '@/features/auth/stores/user-store';
import type { PaymentSchemaType } from '../helpers/payment-schema';
import type { TeamPayment } from '../api/team-payments-client';

type Props = {
  teamId: string;
  payment: TeamPayment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const EditPaymentModal = ({ teamId, payment, open, onOpenChange }: Props) => {
  const { editPayment } = useEditTeamPayment(teamId, () => onOpenChange(false));
  const user = useUserStore(state => state.user);

  const onSubmit = (value: PaymentSchemaType) => {
    if (!user) return;

    editPayment.mutate({
      paymentId: payment.id,
      payerId: payment.payerId, // Keep the original payer
      debtorsIds: value.debtors.map(debtor => debtor.id),
      title: value.title,
      amount: Math.round(value.amount * 100), // Convert decimal to cents
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar pagamento</DialogTitle>
        </DialogHeader>

        <PaymentForm
          className="flex flex-col gap-6"
          onSubmit={onSubmit}
          defaultValues={{
            title: payment.title,
            amount: payment.amount / 100, // Convert cents to decimal
            debtors: payment.debtors,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
