import { usePaymentsPage } from '../hooks/use-payments-page';
import { List } from '../components/list';

export const PaymentsPage = () => {
  const { payments } = usePaymentsPage();

  if (payments.isLoading) {
    return <p>Carregando pagamentos...</p>;
  }

  if (payments.error) {
    return <p>Erro ao carregar pagamentos: {payments.error.message}</p>;
  }

  return (
    <div>
      <h2>Pagamentos</h2>
      <List items={payments.data}></List>
    </div>
  );
};
