import { Card } from '@/components/card';
import type { Payment } from '../api/payments-client';
import { ListItem } from './list-item';
import { ScrollArea } from '@/components/scroll-area';
import { Paginator } from './pagination/paginator';
import type { Moment } from 'moment';

type Props = {
  items: Payment[];
  pagination: {
    // page: number;
    // totalPages: number;
    // rowsPerPage: number;
    // rowsPerPageOptions: number[];
    // canGoPreviousPage: boolean;
    // canGoNextPage: boolean;
    date: Moment;
    goToPreviousPage: () => void;
    goToNextPage: () => void;
    // updateRowsPerPage: (nextRowsPerPage: number) => void;
  };
};

export const List = ({ items, pagination }: Props) => {
  return (
    <Card className={`flex flex-col h-100 min-w-[max(70%,320px)] p-0 gap-0`}>
      <header className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr]  gap-2 p-1.5 font-bold border-b bg-foreground/9 rounded-t-xl">
        <p>Título</p>
        <p>Valor</p>
        <p>Data</p>
        <p>Categoria</p>
        <p>Status</p>
      </header>
      <ScrollArea className={`overflow-y-auto my-auto p-0`}>
        {items.map(item => (
          <ListItem key={item.id} item={item} className="p-1.5 border-b border-foreground/20 last:border-b-0" />
        ))}

        {items.length === 0 && (
          <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
            Nenhum pagamento encontrado em{' '}
            {pagination.date.toDate().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}.
          </div>
        )}
      </ScrollArea>
      <footer className="flex items-center justify-between gap-3 border-t p-2 bg-foreground/9 rounded-b-xl">
        {/* <label className="flex items-center gap-2 text-sm">
          Linhas por página
          <select
            className="rounded-md border bg-background px-2 py-1"
            value={pagination.rowsPerPage}
            onChange={event => pagination.updateRowsPerPage(Number(event.target.value))}
          >
            {pagination.rowsPerPageOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label> */}

        {/* <RowsPerPage pagination={pagination} /> */}

        <Paginator pagination={pagination} />
      </footer>
    </Card>
  );
};
