import { Card, CardTitle } from '@/components/card';
import type { Balance } from '../api/team-payments-client';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/avatar';
import { getAvatarFullPathById, getInitials } from '@/features/profile/helpers/avatar';
import { ArrowRight, ArrowRightIcon } from '@phosphor-icons/react';

type Props = {
  balances: Balance[];
};

export const Balances = ({ balances }: Props) => {
  if (balances.length === 0) {
    return (
      <Card className="p-6">
        <CardTitle className="text-2xl mb-2">Balanceamento de Dívidas</CardTitle>
        <div className="flex items-center justify-center py-8">
          <p className="text-sm text-muted-foreground">Todas as Dívidas estão equilibradas!</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <CardTitle className="text-2xl mb-2">Balanceamento de Dívidas</CardTitle>
      <div className="space-y-2">
        {balances.map((balance, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center gap-2 pb-2 last:pb-0 border-b border-muted-foreground last:border-b-0"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Avatar size="sm" format="circle" className="shrink-0">
                <AvatarImage
                  src={getAvatarFullPathById(balance.from?.avatar || '')}
                  alt={`foto de perfil do usuário ${balance.from?.fullName}`}
                />
                <AvatarFallback>{getInitials(balance.from?.fullName)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium truncate w-[150px]">{balance.from?.fullName}</span>
            </div>

            <div className="flex items-center justify-between md:justify-start gap-3 md:gap-4">
              <ArrowRightIcon size={20} className="text-muted-foreground hidden md:block" weight="bold" />
              <div className="md:hidden text-xs text-muted-foreground uppercase tracking-wide font-medium">Deve</div>
              <div className="text-sm font-bold text-primar y">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(balance.amount / 100)}
              </div>
            </div>

            <div className="flex items-center gap-2 min-w-0">
              <div className="hidden md:block">
                <ArrowRightIcon size={20} className="text-muted-foreground" weight="bold" />
              </div>
              <Avatar size="sm" format="circle" className="shrink-0">
                <AvatarImage
                  src={getAvatarFullPathById(balance.to?.avatar || '')}
                  alt={`foto de perfil do usuário ${balance.to?.fullName}`}
                />
                <AvatarFallback>{getInitials(balance.to?.fullName)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium truncate w-[150px]">{balance.to?.fullName}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
