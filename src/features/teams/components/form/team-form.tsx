import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/field';
import { teamSchema, type TeamSchemaType } from '../../helpers/team-schema';
import { CardAction } from '@/components/card';
import { MemberCombobox } from './member-combobox';

type Props = {
  className: string;
  onSubmit: (event: TeamSchemaType) => void;
  defaultValues?: TeamSchemaType;
};

export const TeamForm = ({ className, onSubmit, defaultValues = { name: '', members: [] } }: Props) => {
  const form = useForm<TeamSchemaType>({
    resolver: zodResolver(teamSchema),
    defaultValues,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={`flex flex-col gap-6 ${className}`}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-team-name">Nome do Time</FieldLabel>
              <Input
                {...field}
                id="form-team-name"
                aria-invalid={fieldState.invalid}
                placeholder="Digite o nome do time..."
                autoComplete="off"
                type="text"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="members"
          control={form.control}
          render={({ field, fieldState }) => (
            <MemberCombobox
              field={field}
              fieldState={fieldState}
              setValue={(value: any[]) => {
                console.log('Valor selecionado f:', value);
                form.setValue('members', value);
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
