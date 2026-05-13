import { Page } from '@/components/pages/page';
import { Button } from '@/components/button';
import { PlusIcon } from 'lucide-react';
import { TeamsList } from '../components/teams-list';
import { CreateTeamModal } from '../components/create-team-modal';
import { useTeamsPage } from '../hooks/use-teams-page';
import { useState } from 'react';

export const TeamsPage = () => {
  const { teams } = useTeamsPage();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <Page className="p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Times</h1>
            <p className="text-sm text-muted-foreground">Organize seus grupos e divida despesas juntos</p>
          </div>

          <Button
            size="default"
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center gap-2 sm:flex-row w-full sm:w-auto"
          >
            <PlusIcon className="size-4" />
            <span>Novo time</span>
          </Button>
        </div>

        <TeamsList
          teams={teams.data.items}
          onTeamClick={() => {
            console.log('click');
          }}
        />
      </div>

      <CreateTeamModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
    </Page>
  );
};
