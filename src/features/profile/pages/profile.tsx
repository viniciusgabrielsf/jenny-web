import { Page } from '@/components/pages/page';
import moment from 'moment';
import { useProfileUpdate } from '../hooks/use-profile-update';
import type { ProfileUpdateSchemaType } from '../helpers/profile-update-schema';
import { ProfileUpdateForm } from '../components/profile-update-form';
import { usePasswordUpdate } from '../hooks/use-password-update';
import type { PasswordUpdateSchemaType } from '../helpers/password-update-schema';
import { PasswordUpdateForm } from '../components/password-update-form';

export const ProfilePage = () => {
  const { profileUpdate } = useProfileUpdate();
  const { passwordUpdate } = usePasswordUpdate();

  const onSubmitProfile = (value: ProfileUpdateSchemaType) => {
    profileUpdate.mutate({
      ...value,
      birthDate: moment(value.birthDate).format('YYYY-MM-DD'),
    });
  };

  const onSubmitPassword = (value: PasswordUpdateSchemaType) => {
    passwordUpdate.mutate({
      ...value,
    });
  };

  return (
    <Page>
      <main className="mt-10 gap-10 flex flex-col items-center justify-between h-full ">
        <ProfileUpdateForm onSubmit={onSubmitProfile} className="w-[85%] max-w-xl p-4 mb-3" />

        <PasswordUpdateForm onSubmit={onSubmitPassword} className="w-[85%] max-w-xl p-4 mb-3" />
      </main>
    </Page>
  );
};
