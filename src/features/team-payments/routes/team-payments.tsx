import { TeamPaymentsPage } from '../pages/team-payments';

export const TeamPaymentsPageRoutes = {
  TEAM_PAYMENTS: '/team-payments',
};

export const teamPaymentsRoutes = [
  {
    path: TeamPaymentsPageRoutes.TEAM_PAYMENTS,
    element: <TeamPaymentsPage />,
  },
];
