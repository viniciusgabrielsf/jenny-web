import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/pagination';
import type { Moment } from 'moment';

type Props = {
  pagination: {
    date: Moment;
    // totalPages: number;
    // rowsPerPage: number;
    // rowsPerPageOptions: number[];
    // canGoPreviousPage: boolean;
    // canGoNextPage: boolean;
    goToPreviousPage: () => void;
    goToNextPage: () => void;
    // updateRowsPerPage: (nextRowsPerPage: number) => void;
  };
};
export const Paginator = ({ pagination: { date, goToPreviousPage, goToNextPage } }: Props) => {
  const localizedMonthYear = date.toDate().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  return (
    <Pagination className="mx-0 w-auto justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            // className={!pagination.canGoPreviousPage ? 'pointer-events-none opacity-50' : ''}
            onClick={event => {
              event.preventDefault();
              goToPreviousPage();
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <span className="px-2 text-sm">{localizedMonthYear}</span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            // className={!pagination.canGoNextPage ? 'pointer-events-none opacity-50' : ''}
            onClick={event => {
              event.preventDefault();
              goToNextPage();
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
