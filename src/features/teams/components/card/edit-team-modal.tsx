import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/dialog';

import { type TeamSchemaType } from '../../helpers/team-schema';
import { TeamForm } from '../form/team-form';
import { useEditTeam } from '../../hooks/use-edit-team';
import type { Team } from '../../api/teams-client';

type Props = {
  team: Team;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const EditTeamModal = ({ team, open, onOpenChange }: Props) => {
  const { editTeam } = useEditTeam(onOpenChange);

  const onSubmit = (value: TeamSchemaType) => {
    editTeam.mutate({
      ...value,
      teamId: team.id,
      members: value.members.map(member => member.id),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar time</DialogTitle>
        </DialogHeader>

        <TeamForm className="flex flex-col gap-6" onSubmit={onSubmit} defaultValues={team} />
      </DialogContent>
    </Dialog>
  );
};
