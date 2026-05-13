import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { teamsClient } from '../api/teams-client';

export const useDeleteTeam = () => {
  const deleteTeamMutation = useMutation({
    mutationKey: ['delete-team'],
    mutationFn: async (teamId: string) => {
      toast.loading('Excluindo time...', { id: 'delete-team-loading' });

      return teamsClient.deleteTeam(teamId);
    },
    onSuccess: () => {
      toast.dismiss('delete-team-loading');
      toast.success('Time excluído com sucesso!', { id: 'delete-team-success' });
    },
    onError: (error: Error) => {
      toast.dismiss('delete-team-loading');
      toast.error(`Erro ao excluir time: ${error.message}`, { id: 'delete-team-error' });
    },
  });

  return {
    deleteTeam: deleteTeamMutation,
  };
};
