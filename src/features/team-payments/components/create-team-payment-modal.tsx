import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/dialog';
import { PaymentForm } from './form/payment-form';
import { useCreateTeamPayment } from '../hooks/use-create-team-payment';
import { useUserStore } from '@/features/auth/stores/user-store';
import type { PaymentSchemaType } from '../helpers/payment-schema';

type Props = {
  teamId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CreateTeamPaymentModal = ({ teamId, open, onOpenChange }: Props) => {
  const { createPayment } = useCreateTeamPayment(teamId, () => onOpenChange(false));
  const user = useUserStore(state => state.user);

  const onSubmit = (value: PaymentSchemaType) => {
    if (!user) return;

    createPayment.mutate({
      payerId: user.id,
      debtorsIds: value.debtors.map(debtor => debtor.id),
      title: value.title,
      amount: Math.round(value.amount * 100), // Convert decimal to cents
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Criar novo pagamento</DialogTitle>
        </DialogHeader>

        <PaymentForm
          className="flex flex-col gap-6"
          onSubmit={onSubmit}
          defaultValues={{
            title: '',
            amount: 0,
            debtors: [user],
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
