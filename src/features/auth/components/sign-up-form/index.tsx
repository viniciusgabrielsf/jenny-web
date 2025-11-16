import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/field';
import { Input } from '@/components/input';
import { BirthDatePicker } from '../birth-date-picker';
import { PasswordInput } from '../password-input';
import { Button } from '@/components/button';
import { Card, CardAction, CardTitle } from '@/components/card';
import { signUpSchema, type signUpSchemaType } from '../../helpers/sign-up-schema';

type Props = {
  className: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const SignUpForm = ({ onSubmit, className }: Props) => {
  const form = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      birthDate: undefined,
      password: '',
      confirmPassword: '',
    },
  });

  // TODO remover
  function myOnSubmit(data: signUpSchemaType) {
    toast('You submitted the following values:', {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: 'bottom-right',
      classNames: {
        content: 'flex flex-col gap-2',
      },
      style: {
        '--border-radius': 'calc(var(--radius)  + 4px)',
      } as React.CSSProperties,
    });
  }

  return (
    <Card className={className}>
      <CardTitle className="text-2xl">Cadastre-se para começar</CardTitle>

      <form onSubmit={form.handleSubmit(myOnSubmit)}>
        <FieldGroup>
          <Controller
            name="fullName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-sign-up-full-name">Nome Completo</FieldLabel>
                <Input
                  {...field}
                  id="form-sign-up-full-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Digite seu nome completo..."
                  autoComplete="off"
                  type="text"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-sign-up-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="form-sign-up-email"
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
            name="birthDate"
            control={form.control}
            render={({ field, fieldState }) => (
              <BirthDatePicker
                field={field}
                fieldState={fieldState}
                setValue={(value: Date) => form.setValue('birthDate', value)}
                placeholder="Selecione sua data de nascimento..."
              />
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <PasswordInput label="Senha" placeholder="Digite sua senha..." field={field} fieldState={fieldState} />
            )}
          />

          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <PasswordInput
                label="Confirmar senha"
                placeholder="Confirme sua senha..."
                field={field}
                fieldState={fieldState}
              />
            )}
          />

          <CardAction className="w-full flex">
            <Button type="submit">Cadastrar</Button>
          </CardAction>
        </FieldGroup>
      </form>
    </Card>
  );
};
