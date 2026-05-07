import type { Payment } from '../api/payments-client';
import { CategoryBadge } from './list-fields/category-badge';
import { StatusBadge } from './list-fields/status-badge';

type Props = {
  item: Payment;
  className?: string;
};

export const ListItem = ({ item, className }: Props) => {
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(item.amount);

  const formattedDate = new Date(item.paymentDate).toLocaleDateString('pt-BR');

  const textStyle = 'text-sm min-w-0 truncate';

  return (
    <article className={`grid grid-cols-[3fr_1fr_1fr_1fr_1fr] gap-4 py-2 ${className}`}>
      <p className={textStyle}>{item.title}</p>
      <p className={textStyle}>{formattedAmount}</p>
      <p className={textStyle}>{formattedDate}</p>
      <CategoryBadge category={item.category} />
      <StatusBadge status={item.status} />
    </article>
  );
};
