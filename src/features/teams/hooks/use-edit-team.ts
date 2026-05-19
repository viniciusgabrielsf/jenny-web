import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { teamsClient, type EditTeamRequest } from '../api/teams-client';

export const useEditTeam = (onClose?: () => void) => {
  const queryClient = useQueryClient();

  const editTeamMutation = useMutation({
    mutationKey: ['edit-team'],
    mutationFn: async (request: EditTeamRequest) => {
      toast.loading('Editando time...', { id: 'edit-team-loading' });

      return teamsClient.editTeam(request);
    },
    onSuccess: () => {
      toast.dismiss('edit-team-loading');
      toast.success('Time editado com sucesso!', { id: 'edit-team-success' });
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      onClose?.();
    },
    onError: (error: Error) => {
      toast.dismiss('edit-team-loading');
      toast.error(`Erro ao editar time: ${error.message}`, { id: 'edit-team-error' });
    },
  });

  return {
    editTeam: editTeamMutation,
  };
};
