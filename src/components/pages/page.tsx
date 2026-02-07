import { useAuthStore } from '@/features/auth/stores/auth-store';
import { ScrollArea } from '../scroll-area';
import { Header } from './header';
import { NavigationMenu } from '../menus/navigation-menu';

type Props = {
  className?: string;
  hideHeader?: boolean;
  hideMenu?: boolean;
  children: React.ReactNode;
};

export const Page = ({ className, hideHeader = false, hideMenu = false, children }: Props) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <div
      className={`flex flex-col bg-linear-to-b from-background from-55% to-secondary/40 text-center h-screen min-w-[max(100%,320px)]`}
    >
      {!hideHeader && <Header />}

      <ScrollArea className={`overflow-y-auto my-auto`}>
        <main className={`gap-10 flex flex-col items-center justify-between h-full ${className}`}>{children}</main>
      </ScrollArea>

      {!hideMenu && isAuthenticated && <NavigationMenu />}
    </div>
  );
};
