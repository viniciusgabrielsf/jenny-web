import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldGroup, FieldLabel } from '@components/field';
import { Input } from '@components/input';
import { BirthDatePicker } from '../../../components/fields/birth-date-picker';
import { Button } from '@components/button';
import { Card, CardAction, CardTitle } from '@components/card';
import { profileUpdateSchema, type ProfileUpdateSchemaType } from '../helpers/profile-update-schema';
import { useUserStore } from '@/features/auth/stores/user-store';
import { AvatarPicker } from './avatar-picker';

type Props = {
  className: string;
  onSubmit: (event: ProfileUpdateSchemaType) => void;
};

export const ProfileUpdateForm = ({ onSubmit, className }: Props) => {
  const user = useUserStore(state => state.user);
  const form = useForm<ProfileUpdateSchemaType>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      fullName: user?.fullName ?? '',
      email: user?.email ?? '',
      birthDate: user?.birthDate ?? undefined,
      avatar: user?.avatar ?? '',
    },
  });

  return (
    <Card className={className}>
      <CardTitle className="text-2xl">Atualize seu perfil</CardTitle>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="fullName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-profile-update-full-name">Nome Completo</FieldLabel>
                <Input
                  {...field}
                  id="form-profile-update-full-name"
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
                <FieldLabel htmlFor="form-profile-update-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="form-profile-update-email"
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
            name="avatar"
            control={form.control}
            render={({ field, fieldState }) => (
              <AvatarPicker
                field={field}
                fieldState={fieldState}
                setValue={(value: string) => form.setValue('avatar', value)}
              />
            )}
          />

          <CardAction className="w-full flex justify-end">
            <Button type="submit">Atualizar Perfil</Button>
          </CardAction>
        </FieldGroup>
      </form>
    </Card>
  );
};
