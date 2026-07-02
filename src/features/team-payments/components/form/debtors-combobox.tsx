import * as React from 'react';

import { type ControllerFieldState, type ControllerRenderProps } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/components/field';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar';
import { useTeamPaymentMembers } from '../../hooks/use-team-payment-members';
import type { TeamMember } from '@/features/teams/api/teams-client';
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/combobox';
import { getAvatarFullPathById, getInitials } from '@/features/profile/helpers/avatar';

type Props = {
  field: ControllerRenderProps<any, any>;
  fieldState: ControllerFieldState;
  setValue: (value: any[]) => void;
};

export const DebtorsCombobox = ({ field, fieldState, setValue }: Props) => {
  const anchor = useComboboxAnchor();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { members, setSearch } = useTeamPaymentMembers();

  return (
    <div ref={containerRef}>
      <Field>
        <FieldLabel htmlFor="debtor-select">Devedores</FieldLabel>

        <Combobox
          multiple
          autoHighlight
          items={members.data.items}
          value={field.value}
          onValueChange={setValue}
          isItemEqualToValue={(item, value) => item.id === value.id}
          onInputValueChange={value => setSearch(value)}
        >
          <ComboboxChips ref={anchor} className="w-full max-w-xs">
            <ComboboxValue>
              {values => (
                <React.Fragment>
                  {values.map((value: TeamMember) => (
                    <ComboboxChip key={`debtor-value-${value.id}`}>
                      <Avatar size="sm" format="circle" className="cursor-pointer">
                        <AvatarImage
                          src={getAvatarFullPathById(value.avatar || '')}
                          alt={`foto de perfil do usuário ${value.fullName}`}
                        />
                        <AvatarFallback>{getInitials(value.fullName)}</AvatarFallback>
                      </Avatar>
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput placeholder="Selecione devedores..." />
                </React.Fragment>
              )}
            </ComboboxValue>
          </ComboboxChips>

          <ComboboxContent anchor={anchor} container={containerRef}>
            <ComboboxEmpty>Usuários não encontrados</ComboboxEmpty>
            <ComboboxList>
              {item => (
                <ComboboxItem key={`debtor-item-${item.id}`} value={item}>
                  <Avatar size="sm" className="cursor-pointer">
                    <AvatarImage
                      src={getAvatarFullPathById(item.avatar || '')}
                      alt={`foto de perfil do usuário ${item.fullName}`}
                    />
                    <AvatarFallback>{getInitials(item.fullName)}</AvatarFallback>
                  </Avatar>
                  <span>{item.fullName}</span>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>

        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </Field>
    </div>
  );
};
