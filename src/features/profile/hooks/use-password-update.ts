import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { profileClient, type PasswordRequest } from '../api/profile-client';

export const usePasswordUpdate = () => {
  const updatePasswordMutation = useMutation({
    mutationKey: ['password-update'],
    mutationFn: async (request: PasswordRequest) => {
      toast.loading('Atualizando senha...', { id: 'password-update-loading' });
      return profileClient.updatePassword(request);
    },
    onSuccess: () => {
      toast.dismiss('password-update-loading');
      toast.success('Senha atualizada com sucesso!', { id: 'password-update-success' });
    },
    onError: (error: Error) => {
      toast.dismiss('password-update-loading');
      toast.error(`Erro ao atualizar senha: ${error.message}`, { id: 'password-update-error' });
    },
  });

  return {
    passwordUpdate: updatePasswordMutation,
  };
};
