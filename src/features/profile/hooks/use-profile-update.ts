import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { profileClient, type profileRequest } from '../api/profile-client';
import { useUserStore } from '@/features/auth/stores/user-store';
import { userClient } from '@/features/auth/api/user-client';

export const useProfileUpdate = () => {
  const setUser = useUserStore(state => state.setUser);

  const updateProfileMutation = useMutation({
    mutationKey: ['profile-update'],
    mutationFn: async (request: profileRequest) => {
      toast.loading('Atualizando perfil...', { id: 'profile-update-loading' });
      return profileClient.updateProfile(request);
    },
    onSuccess: async () => {
      await userClient.me().then(data => {
        setUser({
          id: data.id,
          fullName: data.fullName,
          email: data.email,
          birthDate: new Date(data.birthDate),
          avatar: data.avatar,
        });
      });

      toast.dismiss('profile-update-loading');
      toast.success('Perfil atualizado com sucesso!', { id: 'profile-update-success' });
    },
    onError: (error: Error) => {
      toast.dismiss('profile-update-loading');
      toast.error(`Erro ao atualizar perfil: ${error.message}`, { id: 'profile-update-error' });
    },
  });

  return {
    profileUpdate: updateProfileMutation,
  };
};
