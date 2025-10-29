import { Button } from '@/components/button';
import { ModeToggle } from '@/components/mode-toggler';

type Props = {
  className?: string;
};

export const Header = ({ className }: Props) => {
  return (
    <header className={`flex justify-between items-center bg-transparent p-3 ${className}`}>
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="Lâmpada mágica" className="w-10 h-10" />

        <p className="text-xl">Jenny</p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="secondary">Cadastrar</Button>
        <Button>Login</Button>
        <ModeToggle />
      </div>
    </header>
  );
};
