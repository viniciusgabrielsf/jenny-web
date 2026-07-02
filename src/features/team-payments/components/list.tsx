import { Card } from '@/components/card';
import type { TeamPayment } from '../api/team-payments-client';
import { ListItem } from './list-item';
import { ScrollArea } from '@/components/scroll-area';
import { Paginator } from './pagination/paginator';
import type { Moment } from 'moment';

type Props = {
  items: TeamPayment[];
  pagination: {
    date: Moment;
    goToPreviousPage: () => void;
    goToNextPage: () => void;
  };
  onEdit: (item: TeamPayment) => void;
  onDelete: (item: TeamPayment) => void;
};

export const List = ({ items, pagination, onEdit, onDelete }: Props) => {
  return (
    <Card className={`flex flex-col h-100 min-w-[max(70%,320px)] p-0 gap-0`}>
      <header className="grid grid-cols-[1fr_2fr_3fr_1fr] sm:grid-cols-[1fr_5fr_3fr_2fr_5fr_1fr] gap-3 sm:gap-4 p-2 sm:p-3 font-bold border-b bg-foreground/9 rounded-t-xl text-xs sm:text-sm">
        <p>Pagante</p>
        <p>Título</p>
        <p>Valor</p>
        <p className="hidden sm:block">Data</p>
        <p className="hidden md:block">Devedores</p>
        <p>Ações</p>
      </header>
      <ScrollArea className={`overflow-y-auto my-auto p-0`}>
        {items.map(item => (
          <ListItem
            key={item.id}
            item={item}
            className="p-2 sm:p-3 border-b border-foreground/20 last:border-b-0"
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}

        {items.length === 0 && (
          <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
            Nenhum pagamento encontrado em{' '}
            {pagination.date.toDate().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}.
          </div>
        )}
      </ScrollArea>
      <footer className="flex items-center justify-between gap-3 border-t p-2 bg-foreground/9 rounded-b-xl">
        <Paginator pagination={pagination} />
      </footer>
    </Card>
  );
};
