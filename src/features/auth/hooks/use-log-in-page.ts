import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { logInClient, type LogInRequest } from '../api/log-in-client';
import { toast } from 'sonner';

export const useLogInPage = () => {
  const navigate = useNavigate();

  const logInMutation = useMutation({
    mutationKey: ['log-in'],
    mutationFn: async (request: LogInRequest) => {
      toast.loading('Entrando na conta...', { id: 'log-in-loading' });

      return logInClient.logIn(request);
    },
    onSuccess: () => {
      toast.dismiss('log-in-loading  ');
      toast.success('Entrou na conta com sucesso!', { id: 'log-in-success' });
    },
    onError: (error: Error) => {
      toast.dismiss('log-in-loading');
      toast.error(`Erro ao entrar na conta: ${error.message}`, { id: 'log-in-error' });
    },
  });

  return {
    logIn: logInMutation,
  };
};
