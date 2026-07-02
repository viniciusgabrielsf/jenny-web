import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/field';
import { paymentSchema, type PaymentSchemaType } from '../../helpers/payment-schema';
import { CardAction } from '@/components/card';
import { DebtorsCombobox } from './debtors-combobox';

type Props = {
  className?: string;
  onSubmit: (event: PaymentSchemaType) => void;
  defaultValues?: Partial<PaymentSchemaType>;
};

export const PaymentForm = ({
  className = '',
  onSubmit,
  defaultValues = { title: '', amount: 0, debtors: [] },
}: Props) => {
  const form = useForm<PaymentSchemaType>({
    resolver: zodResolver(paymentSchema),
    defaultValues: defaultValues as PaymentSchemaType,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={`flex flex-col gap-6 ${className}`}>
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-payment-title">Título</FieldLabel>
              <Input
                {...field}
                id="form-payment-title"
                aria-invalid={fieldState.invalid}
                placeholder="Digite o título do pagamento..."
                autoComplete="off"
                type="text"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="amount"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-payment-amount">Valor (R$)</FieldLabel>
              <Input
                {...field}
                id="form-payment-amount"
                aria-invalid={fieldState.invalid}
                placeholder="0,00"
                type="number"
                step="0.01"
                min="0"
                onChange={e => {
                  const value = parseFloat(e.target.value) || 0;
                  field.onChange(value);
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="debtors"
          control={form.control}
          render={({ field, fieldState }) => (
            <DebtorsCombobox
              field={field}
              fieldState={fieldState}
              setValue={(value: any[]) => {
                form.setValue('debtors', value);
              }}
            />
          )}
        />

        <CardAction className="w-full flex justify-end">
          <Button type="submit">Salvar</Button>
        </CardAction>
      </FieldGroup>
    </form>
  );
};
