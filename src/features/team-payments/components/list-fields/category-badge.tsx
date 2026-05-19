import { BankIcon, CarIcon, ForkKnifeIcon, HouseIcon, QuestionIcon, ShoppingBagIcon } from '@phosphor-icons/react';
import type { IconWeight } from '@phosphor-icons/react';
import type { ComponentType } from 'react';

type Category = 'housing' | 'transport' | 'food' | 'shopping' | 'bills' | 'entertainment' | 'utilities' | 'other';

type Props = {
  category: string;
};

const categoryStyles: Record<
  Category,
  { label: string; className: string; icon: ComponentType<{ size?: number; weight?: IconWeight }> }
> = {
  housing: {
    label: 'casa',
    className: 'bg-sky-900 text-sky-300',
    icon: HouseIcon,
  },
  transport: {
    label: 'transporte',
    className: 'bg-indigo-900 text-indigo-300',
    icon: CarIcon,
  },
  food: {
    label: 'alimentação',
    className: 'bg-teal-900 text-teal-300',
    icon: ForkKnifeIcon,
  },
  entertainment: {
    label: 'entretenimento',
    className: 'bg-fuchsia-900 text-fuchsia-300',
    icon: ShoppingBagIcon,
  },
  utilities: {
    label: 'serviços',
    className: 'bg-blue-900 text-blue-300',
    icon: BankIcon,
  },
  other: {
    label: 'outros',
    className: 'bg-zinc-800 text-zinc-300',
    icon: QuestionIcon,
  },
  shopping: {
    label: 'compras',
    className: 'bg-violet-900 text-violet-300',
    icon: ShoppingBagIcon,
  },
  bills: {
    label: 'contas',
    className: 'bg-cyan-900 text-cyan-300',
    icon: BankIcon,
  },
};

export const CategoryBadge = ({ category }: Props) => {
  const normalizedCategory = category.toLowerCase() as Category;
  const categoryConfig = categoryStyles[normalizedCategory];
  const Icon = categoryConfig?.icon ?? QuestionIcon;

  return (
    <span
      className={`inline-flex w-fit items-center gap-1 rounded-sm px-2 py-1 text-xs text-sm ${categoryConfig?.className ?? 'bg-zinc-800 text-zinc-300'}`}
    >
      <Icon size={12} weight="fill" />
      {categoryConfig?.label ?? category}
    </span>
  );
};
