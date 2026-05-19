import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/dialog';

import { type TeamSchemaType } from '../helpers/team-schema';
import { TeamForm } from './form/team-form';
import { useCreateTeam } from '../hooks/use-create-team';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CreateTeamModal = ({ open, onOpenChange }: Props) => {
  const { createTeam } = useCreateTeam(() => onOpenChange(false));

  const onSubmit = (value: TeamSchemaType) => {
    createTeam.mutate({
      ...value,
      members: value.members.map(member => member.id),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Criar novo time</DialogTitle>
        </DialogHeader>

        <TeamForm className="flex flex-col gap-6" onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};
