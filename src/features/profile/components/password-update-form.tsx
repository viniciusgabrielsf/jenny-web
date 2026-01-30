import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldGroup } from '@components/field';
import { PasswordInput } from '../../../components/fields/password-input';
import { Button } from '@components/button';
import { Card, CardAction, CardTitle } from '@components/card';
import { passwordUpdateSchema, type PasswordUpdateSchemaType } from '../helpers/password-update-schema';

type Props = {
  className: string;
  onSubmit: (event: PasswordUpdateSchemaType) => void;
};

export const PasswordUpdateForm = ({ onSubmit, className }: Props) => {
  const form = useForm<PasswordUpdateSchemaType>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });

  return (
    <Card className={className}>
      <CardTitle className="text-2xl">Atualize sua senha</CardTitle>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="oldPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <PasswordInput
                label="Senha Antiga"
                placeholder="Digite sua senha antiga..."
                field={field}
                fieldState={fieldState}
              />
            )}
          />

          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <PasswordInput
                label="Nova senha"
                placeholder="Digite sua nova senha..."
                field={field}
                fieldState={fieldState}
              />
            )}
          />

          <CardAction className="w-full flex justify-end">
            <Button type="submit">Atualizar Senha</Button>
          </CardAction>
        </FieldGroup>
      </form>
    </Card>
  );
};
