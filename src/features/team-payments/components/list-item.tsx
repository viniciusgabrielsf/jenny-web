import type { TeamPayment } from '../api/team-payments-client';
import { Button } from '@/components/button';
import { EditIcon, TrashIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage, AvatarGroup } from '@/components/avatar';
import { getAvatarFullPathById, getInitials } from '@/features/profile/helpers/avatar';
import type { TeamMember } from '@/features/teams/api/teams-client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { EllipsisVerticalIcon } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Activity } from 'react';

type Props = {
  item: TeamPayment;
  className?: string;
  onEdit: (item: TeamPayment) => void;
  onDelete: (item: TeamPayment) => void;
};

const VISIBLE_DEBTORS = 3;

export const ListItem = ({ item, className, onEdit, onDelete }: Props) => {
  // Use debtors from API response or fallback to empty array
  const debtors = item.debtors || [];

  // Convert cents to decimal BRL format
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(item.amount / 100);

  const formattedDate = new Date(item.paymentDate).toLocaleDateString('pt-BR');
  const textStyle = 'text-sm min-w-0 truncate';
  const visibleDebtors = debtors.slice(0, VISIBLE_DEBTORS);
  const hiddenDebtorsCount = Math.max(0, debtors.length - VISIBLE_DEBTORS);
  const mobileWidthMatches = useMediaQuery('(max-width: 640px)');

  return (
    <article
      className={`grid grid-cols-[1fr_2fr_3fr_1fr] sm:grid-cols-[1fr_5fr_3fr_2fr_5fr_1fr] gap-3 sm:gap-4 py-2 sm:py-3 items-center ${className}`}
    >
      <Avatar size="sm" format="circle" className="shrink-0" title={`Pago por ${item.payer?.fullName}`}>
        <AvatarImage
          src={getAvatarFullPathById(item.payer?.avatar || '')}
          alt={`foto de perfil do usuário ${item.payer?.fullName}`}
        />
        <AvatarFallback>{getInitials(item.payer?.fullName)}</AvatarFallback>
      </Avatar>
      <p className={`${textStyle} font-medium`}>{item.title}</p>
      <p className={`${textStyle} font-semibold`}>{formattedAmount}</p>
      <p className={`${textStyle} hidden sm:block`}>{formattedDate}</p>
      <div className="hidden md:flex shrink-0 -space-x-2">
        <AvatarGroup>
          {visibleDebtors.map((debtor: TeamMember) => (
            <Avatar key={`debtor-${debtor.id}`} size="sm" format="circle" title={debtor.fullName}>
              <AvatarImage
                src={getAvatarFullPathById(debtor.avatar || '')}
                alt={`foto de perfil do usuário ${debtor.fullName}`}
              />
              <AvatarFallback>{getInitials(debtor.fullName)}</AvatarFallback>
            </Avatar>
          ))}
          {hiddenDebtorsCount > 0 && (
            <Avatar size="sm" format="circle" title={`+${hiddenDebtorsCount} devedor(es)`}>
              <AvatarFallback>{`+${hiddenDebtorsCount}`}</AvatarFallback>
            </Avatar>
          )}
        </AvatarGroup>
      </div>

      <Activity mode={mobileWidthMatches ? 'hidden' : 'visible'}>
        <div className="flex gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onEdit(item)}
            className="text-foreground hover:text-primary"
            title="Editar pagamento"
          >
            <EditIcon className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onDelete(item)}
            className="text-foreground hover:text-destructive"
            title="Deletar pagamento"
          >
            <TrashIcon className="size-4" />
          </Button>
        </div>
      </Activity>

      <Activity mode={mobileWidthMatches ? 'visible' : 'hidden'}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="shrink-0" onClick={e => e.stopPropagation()}>
              <EllipsisVerticalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => onEdit(item)}>Editar</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(item)} className="text-destructive">
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Activity>
    </article>
  );
};
