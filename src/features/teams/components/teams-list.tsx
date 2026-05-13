import type { Team } from '../api/teams-client';
import { TeamCard } from './card/team-card';

type Props = {
  teams: Team[];
  onTeamClick: (team: Team) => void;
};

export const TeamsList = ({ teams, onTeamClick }: Props) => {
  if (teams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="text-sm text-muted-foreground">
          <p className="font-medium">Nenhum time ainda</p>
          <p className="text-xs">Crie um time para começar a dividir despesas com a galera</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-6 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {teams.map(team => (
        <TeamCard key={`team-card-${team.id}`} team={team} onClick={onTeamClick} />
      ))}
    </div>
  );
};
