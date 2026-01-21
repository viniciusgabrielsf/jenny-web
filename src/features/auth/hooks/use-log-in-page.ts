import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { authClient, type LogInRequest, type LogInResponse } from '../api/auth-client';
import { toast } from 'sonner';
import { useAuthStore } from '../stores/auth-store';
import { useUserStore } from '../stores/user-store';
import { profilePageRoutes } from '@/features/profile/routes/profile';

export const useLogInPage = () => {
  const navigate = useNavigate();

  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);
  const setUser = useUserStore(state => state.setUser);

  const logInMutation = useMutation({
    mutationKey: ['log-in'],
    mutationFn: async (request: LogInRequest) => {
      toast.loading('Entrando na conta...', { id: 'log-in-loading' });

      return authClient.logIn(request);
    },
    onSuccess: (data: LogInResponse) => {
      setIsAuthenticated(true);
      setUser({
        id: data.id,
        fullName: data.fullName,
        email: data.email,
        birthDate: new Date(data.birthDate),
      });

      toast.dismiss('log-in-loading');
      toast.success('Entrou na conta com sucesso!', { id: 'log-in-success' });

      // TODO change to home page after implementing it
      navigate(profilePageRoutes.PROFILE);
    },
    onError: (error: Error) => {
      setIsAuthenticated(false);
      setUser(null);

      toast.dismiss('log-in-loading');
      toast.error(`Erro ao entrar na conta: ${error.message}`, { id: 'log-in-error' });
    },
  });

  return {
    logIn: logInMutation,
  };
};
