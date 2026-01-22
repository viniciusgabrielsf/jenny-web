import { useLogOut } from '@/features/auth/hooks/use-log-out';
import { profilePageRoutes } from '@/features/profile/routes/profile';
import { Button } from '@components/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@components/dropdown-menu';
import { SignOutIcon, UserIcon } from '@phosphor-icons/react';
import { useNavigate } from 'react-router';

export function UserOptions() {
  const navigate = useNavigate();
  const { logOut } = useLogOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <UserIcon size={32} weight="duotone" />
          <span className="sr-only">Perfil</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate(profilePageRoutes.PROFILE)}>
          <UserIcon size={32} /> Perfil
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => logOut.mutate()}>
          <SignOutIcon size={32} /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
