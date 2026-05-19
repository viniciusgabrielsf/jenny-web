import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { teamsClient } from '../api/teams-client';

// TODO validate if use pagination in near future
export const useTeamsPage = () => {
  //   const [page, setPage] = useState(1);
  const [search, setSearch] = useState();
  //   const [rowsPerPage, setRowsPerPage] = useState(5);

  const teamsQuery = useQuery({
    queryKey: ['teams', { search }],
    queryFn: async () => {
      return teamsClient.getMyTeams({
        filter: {
          search,
        },
      });
    },
    initialData: {
      items: [],
      total: 0,
    },
  });

  // const totalPages = Math.max(1, Math.ceil(teamsQuery.data.total / rowsPerPage));
  // const canGoPreviousPage = page > 1;
  // const canGoNextPage = page < totalPages;

  // useEffect(() => {
  //   if (page > totalPages) {
  //     setPage(totalPages);
  //   }
  // }, [page, totalPages]);

  return {
    teams: teamsQuery,
    search,
    setSearch,
    pagination: {
      // page,
      // totalPages,
      // rowsPerPage,
      // rowsPerPageOptions: [5, 10, 20],
      // canGoPreviousPage,
      // canGoNextPage,
      //   goToPreviousPage: () => {
      //     // if (!
      //     setSearch(search => moment(search).subtract(1, 'month'));
      //   },
      //   goToNextPage: () => {
      //     setSearch(search => moment(search).add(1, 'month'));
      //   },
      // upsearchRowsPerPage: (nextRowsPerPage: number) => {
      //   setRowsPerPage(nextRowsPerPage);
      //   setPage(1);
      // },
    },
  };
};
