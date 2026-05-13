import * as React from 'react';

import { type ControllerFieldState, type ControllerRenderProps } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/components/field';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar';
import { useTeamMembers } from '../../hooks/use-team-members';
import type { TeamMember } from '../../api/teams-client';
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

export const MemberCombobox = ({ field, fieldState, setValue }: Props) => {
  const anchor = useComboboxAnchor();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { members, setSearch } = useTeamMembers();

  return (
    <div ref={containerRef}>
      <Field>
        <FieldLabel htmlFor="member-select-edit">Membros</FieldLabel>

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
                    <ComboboxChip key={`member-value-${value.id}`}>
                      <Avatar size="sm" format="circle" className="cursor-pointer">
                        <AvatarImage
                          src={getAvatarFullPathById(value.avatar || '')}
                          alt={`foto de perfil do usuário ${value.fullName}`}
                        />
                        <AvatarFallback>{getInitials(value.fullName)}</AvatarFallback>
                      </Avatar>
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput placeholder="Selecione membros..." />
                </React.Fragment>
              )}
            </ComboboxValue>
          </ComboboxChips>

          <ComboboxContent anchor={anchor} container={containerRef}>
            <ComboboxEmpty>Usuários não encontrados</ComboboxEmpty>
            <ComboboxList>
              {item => (
                <ComboboxItem key={`member-item-${item.id}`} value={item}>
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
