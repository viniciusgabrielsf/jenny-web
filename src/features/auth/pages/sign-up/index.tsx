import { Header } from '@/components/header';
import { SignUpForm } from '../../components/sign-up-form';
import { Page } from '@/components/page';

export const SignUpPage = () => {
  return (
    <Page>
      <Header />
      <main className="mt-10 gap-10 flex flex-col items-center justify-between h-full ">
        <div className="flex items-center gap-4">
          <img src="/logo.svg" alt="Lâmpada mágica" className="w-30 h-30 sm:w-50 sm:h-50" />
          <h1 className="text-6xl sm:text-8xl font-bold">Jenny</h1>
        </div>

        <SignUpForm onSubmit={value => console.log(value)} className="w-[85%] max-w-xl p-4 mb-3" />
      </main>
    </Page>
  );
};
