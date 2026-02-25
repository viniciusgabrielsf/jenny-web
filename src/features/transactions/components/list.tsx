import type { Transaction } from '../api/transactions-client';
import { ListItem } from './list-item';

type Props = {
  items: Transaction[];
};

export const List = ({ items }: Props) => {
  return (
    <div>
      <header className="grid grid-cols-5 gap-4 py-2 font-bold">
        <p>Título</p>
        <p>Valor</p>
        <p>Data de pagamento</p>
        <p>Categoria</p>
        <p>Status</p>
      </header>
      {items.map(item => (
        <ListItem key={item.id} {...item} />
      ))}
    </div>
  );
};
