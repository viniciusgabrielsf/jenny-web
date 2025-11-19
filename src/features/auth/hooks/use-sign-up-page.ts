import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { signUpClient, type SignUpRequest } from '../api/sign-up-client';
import { toast } from 'sonner';

export const useSignUpPage = () => {
  const navigate = useNavigate();

  const signUpMutation = useMutation({
    mutationKey: ['sign-up'],
    mutationFn: async (request: SignUpRequest) => {
      toast.loading('Criando conta...', { id: 'sign-up-loading' });

      return signUpClient.signUp(request);
    },
    onSuccess: () => {
      toast.dismiss('sign-up-loading  ');
      toast.success('Conta criada com sucesso!', { id: 'sign-up-success' });
    },
    onError: (error: Error) => {
      toast.dismiss('sign-up-loading');
      toast.error(`Erro ao criar conta: ${error.message}`, { id: 'sign-up-error' });
    },
  });

  return {
    signUp: signUpMutation,
  };
};
