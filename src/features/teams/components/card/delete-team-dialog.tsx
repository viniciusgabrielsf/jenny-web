import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/dialog';
import { Button } from '@/components/button';
import type { Team } from '../../api/teams-client';
import { useDeleteTeam } from '../../hooks/use-delete-team';

type Props = {
  open: boolean;
  team: Team | null;
  onOpenChange: (open: boolean) => void;
};

export const DeleteTeamDialog = ({ open, team, onOpenChange }: Props) => {
  if (!team) return null;
  const { deleteTeam } = useDeleteTeam(onOpenChange);

  const onSubmitDelete = () => {
    deleteTeam.mutate(team.id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Deletar time</DialogTitle>
          <DialogDescription className="text-sm">
            Tem certeza que deseja deletar <strong>{team.name}</strong>? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 justify-end pt-4">
          <Button variant="outline" disabled={deleteTeam.isPending} onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" disabled={deleteTeam.isPending} onClick={onSubmitDelete}>
            {deleteTeam.isPending ? 'Deletando...' : 'Deletar time'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
