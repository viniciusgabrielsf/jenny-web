export const avatarPaths = [
  'gon.jpg',
  'killua.jpg',
  'kurapika.jpg',
  'leorio.jpg',
  'miles.jpg',
  'gwen.jpg',
  'ekko.jpg',
  'jynx.jpg',
  'aang.jpg',
  'katara.jpg',
  'toph.jpg',
  'zuko.jpg',
  'sokka.jpg',
  'dio.jpg',
  'joao.jpg',
  'kadu.jpg',
];

export const avatars = avatarPaths.map(avatarPath => ({
  id: 'avatar-' + avatarPath.split('.')[0],
  src: avatarPath,
}));
