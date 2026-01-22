import { Header } from '@/components/pages/header';
import { Page } from '@/components/pages/page';

export const ProfilePage = () => {
  return (
    <Page>
      <Header />

      <main className="mt-10 gap-10 flex flex-col items-center justify-between h-full ">
        <div className="flex items-center gap-4">
          <img src="/logo.svg" alt="Lâmpada mágica" className="w-30 h-30 sm:w-50 sm:h-50" />
          <h1 className="text-6xl sm:text-8xl font-bold"> Perfil</h1>
        </div>

        <p className="text-4xl sm:text-6xl font-bold">Transforme o caos financeiro em organização</p>

        <p className="max-w-5xl text-xl sm:text-2xl italic text-muted-foreground">
          Controle seus gastos, crie metas para seus sonhos e divida as contas com a galera, tudo em um só lugar. A sua
          vida financeira pessoal e social, finalmente em sincronia.
        </p>
      </main>
    </Page>
  );
};
