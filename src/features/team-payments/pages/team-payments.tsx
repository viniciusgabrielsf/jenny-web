import { useTeamPaymentsPage } from '../hooks/use-team-payments-page';
import { List } from '../components/list';
import { Page } from '@/components/pages/page';

export const TeamPaymentsPage = () => {
  const { payments, pagination } = useTeamPaymentsPage();

  if (payments.isPending) {
    return <p>Carregando pagamentos...</p>;
  }

  if (payments.isError) {
    return <p>Erro ao carregar pagamentos: {payments.error?.message}</p>
  }

  return (
    <Page className={'gap-0'}>
      <h2>Pagamentos de Equipe</h2>
      <List items={payments.data.items} pagination={pagination}></List>
    </Page>
  );
};
