import { useTeamPaymentsPage } from '../hooks/use-team-payments-page';
import { List } from '../components/list';
import { Page } from '@/components/pages/page';
import { Button } from '@/components/button';
import { PlusIcon } from 'lucide-react';
import { CreateTeamPaymentModal } from '../components/create-team-payment-modal';
import { EditPaymentModal } from '../components/edit-payment-modal';
import { DeletePaymentDialog } from '../components/delete-payment-dialog';
import { useState } from 'react';
import type { TeamPayment } from '../api/team-payments-client';
import { useSearchParams } from 'react-router';

export const TeamPaymentsPage = () => {
  const [searchParams] = useSearchParams();
  const teamId = searchParams.get('teamId') || '';
  const { payments, pagination } = useTeamPaymentsPage();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<TeamPayment | null>(null);

  const handleEdit = (payment: TeamPayment) => {
    setSelectedPayment(payment);
    setEditModalOpen(true);
  };

  const handleDelete = (payment: TeamPayment) => {
    setSelectedPayment(payment);
    setDeleteDialogOpen(true);
  };

  if (payments.isPending) {
    return <p>Carregando pagamentos...</p>;
  }

  if (payments.isError) {
    return <p>Erro ao carregar pagamentos: {payments.error?.message}</p>;
  }

  return (
    <Page className="p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Pagamentos de Equipe</h1>
            <p className="text-sm text-muted-foreground">Acompanhe quem deve o quê</p>
          </div>

          <Button
            size="default"
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center gap-2 sm:flex-row w-full sm:w-auto"
          >
            <PlusIcon className="size-4" />
            <span>Novo Pagamento</span>
          </Button>
        </div>

        <List items={payments.data.items} pagination={pagination} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      <CreateTeamPaymentModal teamId={teamId} open={createModalOpen} onOpenChange={setCreateModalOpen} />
      {selectedPayment && (
        <EditPaymentModal
          teamId={teamId}
          payment={selectedPayment}
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
        />
      )}
      {selectedPayment && (
        <DeletePaymentDialog
          teamId={teamId}
          payment={selectedPayment}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        />
      )}
    </Page>
  );
};
