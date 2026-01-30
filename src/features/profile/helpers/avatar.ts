import { avatars } from '@/assets/avatars';

export const getInitials = (name: string): string => {
  const namesArray = name.trim().split(' ');

  if (namesArray.length === 0) return '';

  const firstName = namesArray[0];
  const lastName = namesArray[namesArray.length - 1];

  return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
};

export const getAvatarById = (id: string) => {
  return avatars.find(avatar => avatar.id === id);
};

export const getAvatarFullPathById = (id: string) => {
  const avatar = getAvatarById(id);
  return avatar ? `src/assets/avatars/${avatar.src}` : undefined;
};
