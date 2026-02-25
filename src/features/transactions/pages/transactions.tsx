import { useTransactionsPage } from '../hooks/use-transactions-page';
import { List } from '../components/list';

export const TransactionsPage = () => {
  const { transactions } = useTransactionsPage();

  if (transactions.isLoading) {
    return <p>Carregando transações...</p>;
  }

  if (transactions.error) {
    return <p>Erro ao carregar transações: {transactions.error.message}</p>;
  }

  return (
    <div>
      <h2>Transações</h2>
      <List items={transactions.data}></List>
    </div>
  );
};
