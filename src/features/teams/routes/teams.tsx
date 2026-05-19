import { TeamsPage } from '../pages/teams';

export const teamsPageRoutes = {
  TEAMS: '/teams',
};

export const teamsRoutes = [
  {
    path: teamsPageRoutes.TEAMS,
    element: <TeamsPage />,
  },
];
