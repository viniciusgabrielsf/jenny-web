import { TransactionsPage } from '../pages/transactions';

export const TransactionsPageRoutes = {
  TRANSACTIONS: '/transactions',
};

export const transactionsRoutes = [
  {
    path: TransactionsPageRoutes.TRANSACTIONS,
    element: <TransactionsPage />,
  },
];
