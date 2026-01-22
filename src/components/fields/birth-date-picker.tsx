import * as React from 'react';
import moment from 'moment';
import { Calendar } from '@components/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@components/popover';
import { Field, FieldError, FieldLabel } from '@components/field';
import type { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
import { Input } from '@components/input';
import { Button } from '@components/button';
import { CalendarDotsIcon } from '@phosphor-icons/react';

type Props = {
  field: ControllerRenderProps<any, any>;
  fieldState: ControllerFieldState;
  setValue: (value: Date) => void;
  placeholder?: string;
};

export function BirthDatePicker({ field, fieldState, setValue, placeholder }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Field className="flex flex-col gap-3" data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name} className="px-1">
        Data de Nascimento
      </FieldLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <span className="flex gap-2">
            <Input
              {...field}
              type="text"
              placeholder={placeholder || 'Selecione sua data de nascimento'}
              autoComplete="off"
              value={field.value ? moment(field.value).format('DD/MM/YYYY') : ''}
              id={field.name}
              aria-invalid={fieldState.invalid}
            />
            <Button
              type="button"
              size="icon"
              variant="outline"
              aria-label={placeholder || 'Selecione sua data de nascimento'}
              aria-invalid={fieldState.invalid}
            >
              <CalendarDotsIcon size={32} weight="duotone" />
            </Button>
          </span>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            captionLayout="dropdown"
            onSelect={(date: Date | undefined) => {
              if (!date) return;

              setValue(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}
