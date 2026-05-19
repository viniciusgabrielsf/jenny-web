import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { teamsClient, type CreateTeamRequest } from '../api/teams-client';

export const useCreateTeam = (onOpenChange?: (open: boolean) => void) => {
  const queryClient = useQueryClient();

  const createTeamMutation = useMutation({
    mutationKey: ['create-team'],
    mutationFn: async (request: CreateTeamRequest) => {
      toast.loading('Criando time...', { id: 'create-team-loading' });

      return teamsClient.createTeam(request);
    },
    onSuccess: () => {
      toast.dismiss('create-team-loading');
      toast.success('Time criado com sucesso!', { id: 'create-team-success' });
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      onOpenChange?.(false);
    },
    onError: (error: Error) => {
      toast.dismiss('create-team-loading');
      toast.error(`Erro ao criar time: ${error.message}`, { id: 'create-team-error' });
    },
  });

  return {
    createTeam: createTeamMutation,
  };
};
