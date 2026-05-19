import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { userClient } from '@/features/auth/api/user-client';
import { useDebounce } from '@/hooks/use-debounce';

export const useTeamMembers = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search.trim(), 300);

  const teamMembersQuery = useQuery({
    queryKey: ['team-members', { search: debouncedSearch || undefined }],
    queryFn: async () => {
      return userClient.users({ filter: { search: debouncedSearch || undefined } });
    },
    initialData: {
      items: [],
      total: 0,
    },
  });

  return {
    members: teamMembersQuery,
    search,
    setSearch,
  };
};
