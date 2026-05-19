import { Card, CardAction, CardContent } from '@/components/card';
import { Avatar, AvatarFallback, AvatarImage, AvatarGroup } from '@/components/avatar';
import { Button } from '@/components/button';
import { EllipsisVerticalIcon } from 'lucide-react';
import type { Team } from '../../api/teams-client';
import moment from 'moment';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { getAvatarFullPathById, getInitials } from '@/features/profile/helpers/avatar';
import { EditTeamModal } from './edit-team-modal';
import { useState } from 'react';
import { DeleteTeamDialog } from './delete-team-dialog';

type Props = {
  team: Team;
  onClick: (team: Team) => void;
};

const VISIBLE_AVATARS = 5;

export const TeamCard = ({ team, onClick }: Props) => {
  const createdAtFormatted = moment(team.createdAt).format('DD/MM/YYYY');
  const updatedAtFormatted = moment(team.updatedAt).format('DD/MM/YYYY');
  const visibleMembers = team.members.slice(0, VISIBLE_AVATARS);
  const hiddenCount = Math.max(0, team.members.length - VISIBLE_AVATARS);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <Card className="group hover:shadow-md transition-shadow h-full flex flex-col gap-0 py-2">
      <CardContent className="p-4 sm:p-6 flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base sm:text-lg font-semibold text-foreground transition-colors line-clamp-2">
            {team.name}
          </h3>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="shrink-0" onClick={e => e.stopPropagation()}>
                <EllipsisVerticalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => setEditModalOpen(true)}>Editar</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)} className="text-destructive">
                Deletar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <AvatarGroup>
          {visibleMembers.map(member => (
            <Avatar key={`card-member-${member.id}`} size="sm" format="circle">
              <AvatarImage
                src={getAvatarFullPathById(member.avatar || '')}
                alt={`foto de perfil do usuário ${member.fullName}`}
              />
              <AvatarFallback>{getInitials(member.fullName)}</AvatarFallback>
            </Avatar>
          ))}
          {hiddenCount > 0 && (
            <Avatar key={`card-member-hidden-${hiddenCount}`} size="sm" format="circle">
              <AvatarFallback>{`+${hiddenCount}`}</AvatarFallback>
            </Avatar>
          )}
        </AvatarGroup>

        <div className="mt-auto pt-3 border-t border-border/50 flex flex-col gap-1">
          <div className="flex justify-between gap-2 text-xs text-muted-foreground">
            <span>Criado: {createdAtFormatted}</span>
            <span>Atualizado: {updatedAtFormatted}</span>
          </div>
        </div>
      </CardContent>

      <CardAction className="w-full flex justify-end pr-2">
        <Button onClick={() => onClick(team)}>Pagamentos</Button>
      </CardAction>

      <EditTeamModal team={team} open={editModalOpen} onOpenChange={setEditModalOpen} />
      <DeleteTeamDialog team={team} open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} />
    </Card>
  );
};
