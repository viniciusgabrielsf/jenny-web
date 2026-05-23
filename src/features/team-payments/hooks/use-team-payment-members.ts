import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { userClient } from '@/features/auth/api/user-client';
import { useDebounce } from '@/hooks/use-debounce';
import { useSearchParams as useRouteSearchParams } from 'react-router';

export const useTeamPaymentMembers = () => {
  const [memberSearch, setMemberSearch] = useState('');
  const debouncedSearch = useDebounce(memberSearch.trim(), 300);

  const [searchParams] = useRouteSearchParams();
  const teamId = searchParams.get('teamId') || '';

  const teamMembersQuery = useQuery({
    queryKey: ['team-members', { search: debouncedSearch || undefined, teamId }],
    queryFn: async () => {
      return userClient.users({ filter: { teamId, search: debouncedSearch || undefined } });
    },
    initialData: {
      items: [],
      total: 0,
    },
  });

  return {
    members: teamMembersQuery,
    search: memberSearch,
    setSearch: setMemberSearch,
  };
};
