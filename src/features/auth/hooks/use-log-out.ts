import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { authClient } from '../api/auth-client';
import { toast } from 'sonner';
import { useAuthStore } from '../stores/auth-store';
import { useUserStore } from '../stores/user-store';
import { landingPageRoutes } from '@/features/landing/routes/landing';

export const useLogOut = () => {
  const navigate = useNavigate();

  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);
  const setUser = useUserStore(state => state.setUser);

  const logOutMutation = useMutation({
    mutationKey: ['log-out'],
    mutationFn: async () => {
      toast.loading('Saindo da conta...', { id: 'log-out-loading' });

      return authClient.logOut();
    },
    onSuccess: () => {
      setIsAuthenticated(false);
      setUser(null);

      toast.dismiss('log-out-loading');
      toast.success('Saiu da conta com sucesso!', { id: 'log-out-success' });

      navigate(landingPageRoutes.LANDING);
    },
    onError: (error: Error) => {
      setIsAuthenticated(false);
      setUser(null);

      toast.dismiss('log-out-loading');
      toast.error(`Erro ao sair da conta: ${error.message}`, { id: 'log-out-error' });
    },
  });

  return {
    logOut: logOutMutation,
  };
};
