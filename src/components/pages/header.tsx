import { logInPageRoutes } from '@/features/auth/routes/log-in';
import { Button } from '@components/button';
import { ModeToggle } from '@components/mode-toggler';
import { signUpPageRoutes } from '@features/auth/routes/sign-up';
import { useNavigate } from 'react-router';

type Props = {
  className?: string;
};

export const Header = ({ className }: Props) => {
  const navigate = useNavigate();

  return (
    <header className={`flex justify-between items-center bg-transparent p-3 ${className}`}>
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="Lâmpada mágica" className="w-10 h-10" />

        <p className="text-xl">Jenny</p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="secondary" onClick={() => navigate(signUpPageRoutes.SING_UP)}>
          Cadastrar
        </Button>
        <Button onClick={() => navigate(logInPageRoutes.LOG_IN)}>Entrar</Button>
        <ModeToggle />
      </div>
    </header>
  );
};
