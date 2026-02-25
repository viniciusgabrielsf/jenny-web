type Props = {
  title: string;
  amount: number;
  paymentDate: string;
  category: string;
  status: string;
};

export const ListItem = ({ title, amount, paymentDate, category, status }: Props) => {
  return (
    <article className="grid grid-cols-5 gap-4 py-2">
      <p>{title}</p>
      <p>{amount}</p>
      <p>{paymentDate}</p>
      <p>{category}</p>
      <p>{status}</p>
    </article>
  );
};
