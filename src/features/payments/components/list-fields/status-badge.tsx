import { CheckCircleIcon, ClockClockwiseIcon, XCircleIcon } from '@phosphor-icons/react';
import type { ComponentType } from 'react';
import type { IconWeight } from '@phosphor-icons/react';

type Status = 'completed' | 'pending' | 'failed';

type Props = {
  status: string;
};

const statusStyles: Record<
  Status,
  { label: string; className: string; icon: ComponentType<{ size?: number; weight?: IconWeight }> }
> = {
  completed: {
    label: 'completo',
    className: 'bg-emerald-900 text-emerald-300',
    icon: CheckCircleIcon,
  },
  pending: {
    label: 'pendente',
    className: 'bg-amber-900 text-amber-300',
    icon: ClockClockwiseIcon,
  },
  failed: {
    label: 'falha',
    className: 'bg-red-900 text-red-300',
    icon: XCircleIcon,
  },
};

export const StatusBadge = ({ status }: Props) => {
  const normalizedStatus = status.toLowerCase() as Status;
  const statusConfig = statusStyles[normalizedStatus] ?? statusStyles.pending;
  const Icon = statusConfig.icon;

  return (
    <span
      className={`inline-flex w-fit items-center gap-1 rounded-sm px-2 py-1 text-xs text-sm ${statusConfig.className}`}
    >
      <Icon size={12} weight="fill" />
      {statusConfig.label}
    </span>
  );
};
