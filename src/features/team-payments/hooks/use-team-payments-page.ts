import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { teamPaymentsClient } from '../api/team-payments-client';
import { useSearchParams } from 'react-router';
import moment from 'moment';

// TODO a visão será tratada como mensal.
// TODO o usuário paginará entre meses do ano
export const useTeamPaymentsPage = () => {
  const [searchParams] = useSearchParams();
  const teamId = searchParams.get('teamId') || '';
  // const [page, setPage] = useState(1);
  const [date, setDate] = useState(moment().startOf('month'));
  // const [rowsPerPage, setRowsPerPage] = useState(5);

  const trasactionsQuery = useQuery({
    queryKey: ['teamPayments', { date, teamId }],
    queryFn: async () => {
      return teamPaymentsClient.getMyTeamPayments({
        filter: {
          date: moment(date).format('YYYY-MM-DD'),
          teamId,
        },
      });
    },
    initialData: {
      items: [],
      total: 0,
    },
  });

  // const totalPages = Math.max(1, Math.ceil(trasactionsQuery.data.total / rowsPerPage));
  // const canGoPreviousPage = page > 1;
  // const canGoNextPage = page < totalPages;

  // useEffect(() => {
  //   if (page > totalPages) {
  //     setPage(totalPages);
  //   }
  // }, [page, totalPages]);

  return {
    payments: trasactionsQuery,
    pagination: {
      // page,
      // totalPages,
      // rowsPerPage,
      // rowsPerPageOptions: [5, 10, 20],
      // canGoPreviousPage,
      // canGoNextPage,
      date,
      goToPreviousPage: () => {
        // if (!
        setDate(date => moment(date).subtract(1, 'month'));
      },
      goToNextPage: () => {
        setDate(date => moment(date).add(1, 'month'));
      },
      // updateRowsPerPage: (nextRowsPerPage: number) => {
      //   setRowsPerPage(nextRowsPerPage);
      //   setPage(1);
      // },
    },
  };
};
