import { ChartLineUpIcon, CoinsIcon, UserIcon } from '@phosphor-icons/react';
import { NavLink } from 'react-router';
import { Card } from '../card';
import styles from './navigation-menu.module.css';

export function NavigationMenu() {
  return (
    <Card className="self-center p-0 my-0 w-screen rounded-none md:my-2 md:w-auto md:rounded-xl">
      <nav className="grid grid-flow-col auto-cols-fr justify-items-stretch first:rounded-l-xl last:rounded-r-xl overflow-hidden">
        <NavListItem to="/transactions">
          <CoinsIcon size={20} weight="light" />
          <p className="text-sm">Transações</p>
        </NavListItem>

        <NavListItem to="/dashboard">
          <ChartLineUpIcon size={20} weight="light" />
          <p className="text-sm">Dashboard</p>
        </NavListItem>

        <NavListItem to="/profile">
          <UserIcon size={20} weight="light" />
          <p className="text-sm">Perfil</p>
        </NavListItem>
      </nav>
    </Card>
  );
}

function NavListItem({
  children,
  to,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof NavLink>, 'children'> & { children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-2 flex flex-col h-max w-auto items-center bg-transparent hover:bg-foreground/10 ${styles.container} ${isActive ? styles.active : ''}`
      }
      {...props}
    >
      {children}
      <div className={styles.bar}></div>
    </NavLink>
  );
}
