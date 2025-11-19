import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { signUpClient, type SignUpRequest } from '../api/sign-up-client';

export const useSignUpPage = () => {
  const navigate = useNavigate();

  const signUpMutation = useMutation({
    mutationKey: ['sign-up'],
    mutationFn: async (request: SignUpRequest) => signUpClient.signUp(request),
    // onSuccess: () => {
    //   navigate('/landing');
    // },
    // onError: () => {
    //   navigate('/landing');
    // },
  });

  return {
    signUp: signUpMutation,
  };
};
