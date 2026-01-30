import { z } from 'zod';
export const profileUpdateSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
    .max(100, { message: 'O nome deve ter no máximo 100 caracteres' }),
  email: z.email({ message: 'Email inválido' }),
  birthDate: z.date().max(new Date(), { message: 'Data de nascimento deve ser anterior a hoje' }),
  avatar: z.string().optional(),
});

export type ProfileUpdateSchemaType = z.infer<typeof profileUpdateSchema>;
