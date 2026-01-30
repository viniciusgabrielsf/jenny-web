import * as React from 'react';

import { Field, FieldError, FieldLabel } from '@components/field';
import type { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
import { Input } from '@components/input';
import { PencilSimpleIcon, UserIcon } from '@phosphor-icons/react';
import { Avatar, AvatarBadge, AvatarImage } from '@components/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { avatars } from '@/assets/avatars';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog';
import { useMediaQuery } from '@/hooks/use-media-query';
import { getAvatarFullPathById } from '../helpers/avatar';

type Props = {
  field: ControllerRenderProps<any, any>;
  fieldState: ControllerFieldState;
  setValue: (value: string) => void;
};

export function AvatarPicker({ field, fieldState, setValue }: Props) {
  const [open, setOpen] = React.useState(false);
  const mobileWidthMatches = useMediaQuery('(max-width: 640px)');

  return (
    <Field className="flex flex-col gap-3" data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name} className="px-1">
        Selecione seu Avatar
      </FieldLabel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <span className="flex gap-2">
            <Input
              {...field}
              type="text"
              autoComplete="off"
              value={field.value}
              id={field.name}
              aria-invalid={fieldState.invalid}
              className="hidden"
            />
            <Avatar size="lg" className="cursor-pointer">
              <AvatarImage src={getAvatarFullPathById(field.value)}></AvatarImage>
              <AvatarFallback>
                <UserIcon size={64} weight="light" />
              </AvatarFallback>

              <AvatarBadge>
                <PencilSimpleIcon weight="light" />
              </AvatarBadge>
            </Avatar>
          </span>
        </DialogTrigger>

        <DialogContent className="table max-w-[80vw] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Editar Avatar </DialogTitle>
            <DialogDescription>Selecione um avatar para seu perfil, clique nele para confirmar.</DialogDescription>
          </DialogHeader>

          <div className="w-max max-w-[80vw] max-h-[80vh] overflow-y-auto no-scrollbar px-4 gap-4 grid grid-cols-2 md:grid-cols-4">
            {avatars.map(avatar => {
              return (
                <div
                  className="cursor-pointer"
                  key={avatar.id}
                  onClick={() => {
                    setValue(avatar.id);
                    setOpen(false);
                  }}
                >
                  <Avatar size={mobileWidthMatches ? 'lg' : 'xl'}>
                    <AvatarImage src={getAvatarFullPathById(avatar.id)}></AvatarImage>
                  </Avatar>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}
