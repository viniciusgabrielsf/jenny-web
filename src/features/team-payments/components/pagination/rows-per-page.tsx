import { Field, FieldLabel } from '@/components/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/select';
type Props = {
  pagination: {
    page: number;
    rowsPerPage: number;
    rowsPerPageOptions: number[];
    updateRowsPerPage: (nextRowsPerPage: number) => void;
  };
};
export const RowsPerPage = ({ pagination }: Props) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page">Linhas</FieldLabel>
        <Select
          defaultValue={pagination.rowsPerPage.toString()}
          onValueChange={value => pagination.updateRowsPerPage(Number(value))}
        >
          <SelectTrigger className="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              {pagination.rowsPerPageOptions.map(option => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
};
