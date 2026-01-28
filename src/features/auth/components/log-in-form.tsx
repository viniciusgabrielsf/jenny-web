import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldGroup, FieldLabel } from '@components/field';
import { Input } from '@components/input';
import { PasswordInput } from '../../../components/fields/password-input';
import { Button } from '@components/button';
import { Card, CardAction, CardTitle } from '@components/card';
import { logInSchema, type LogInSchemaType } from '../helpers/log-in-schema';

type Props = {
  className: string;
  onSubmit: (event: LogInSchemaType) => void;
};

export const LogInForm = ({ onSubmit, className }: Props) => {
  const form = useForm<LogInSchemaType>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Card className={className}>
      <CardTitle className="text-2xl">Entre em sua conta</CardTitle>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-log-in-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="form-log-in-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Digite seu email..."
                  autoComplete="off"
                  type="email"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <PasswordInput label="Senha" placeholder="Digite sua senha..." field={field} fieldState={fieldState} />
            )}
          />

          <CardAction className="w-full flex justify-end">
            <Button type="submit">Entrar</Button>
          </CardAction>
        </FieldGroup>
      </form>
    </Card>
  );
};
