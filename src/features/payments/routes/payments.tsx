import { PaymentsPage } from '../pages/payments';

export const PaymentsPageRoutes = {
  PAYMENTS: '/payments',
};

export const paymentsRoutes = [
  {
    path: PaymentsPageRoutes.PAYMENTS,
    element: <PaymentsPage />,
  },
];
