import { logInPageRoutes } from '@/features/auth/routes/log-in';
import { useAuthStore } from '@/features/auth/stores/auth-store';
import { Button } from '@components/button';
import { ModeToggle } from '@components/mode-toggler';
import { signUpPageRoutes } from '@features/auth/routes/sign-up';
import { Activity } from 'react';
import { useNavigate } from 'react-router';
import { UserOptions } from './user-options';

type Props = {
  className?: string;
};

export const Header = ({ className }: Props) => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <header className={`flex justify-between items-center bg-transparent p-3 ${className}`}>
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="Lâmpada mágica" className="w-10 h-10" />

        <p className="text-xl">Jenny</p>
      </div>

      <div className="flex items-center gap-2">
        <Activity mode={isAuthenticated ? 'hidden' : 'visible'}>
          <Button variant="secondary" onClick={() => navigate(signUpPageRoutes.SING_UP)}>
            Cadastrar
          </Button>
          <Button onClick={() => navigate(logInPageRoutes.LOG_IN)}>Entrar</Button>
        </Activity>

        <Activity mode={isAuthenticated ? 'visible' : 'hidden'}>
          <UserOptions />
        </Activity>

        <ModeToggle />
      </div>
    </header>
  );
};
