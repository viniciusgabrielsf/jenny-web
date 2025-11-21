import { Field, FieldError, FieldLabel } from '@components/field';
import type { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
import { Input } from '@components/input';
import { Button } from '@components/button';
import { EyeClosedIcon, EyeIcon } from '@phosphor-icons/react';
import { useState } from 'react';

type Props = {
  field: ControllerRenderProps<any, any>;
  fieldState: ControllerFieldState;
  label: string;
  placeholder?: string;
};

export function PasswordInput({ field, fieldState, label, placeholder }: Props) {
  const [hidden, setHidden] = useState(true);

  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>{label} </FieldLabel>

      <span className="flex gap-2">
        <Input
          {...field}
          id={field.name}
          aria-invalid={fieldState.invalid}
          placeholder={placeholder}
          autoComplete="off"
          type={hidden ? 'password' : 'text'}
        />
        <Button
          type="button"
          size="icon"
          variant="outline"
          aria-invalid={fieldState.invalid}
          aria-label={hidden ? 'Mostrar senha' : 'Esconder senha'}
          onClick={() => setHidden(!hidden)}
        >
          {hidden ? <EyeClosedIcon size={32} weight="light" /> : <EyeIcon size={32} weight="light" />}
        </Button>
      </span>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}
