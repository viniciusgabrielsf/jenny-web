import { z } from 'zod';
export const passwordUpdateSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, { message: 'A senha antiga deve ter pelo menos 8 caracteres' })
      .max(32, { message: 'A senha antiga deve ter no máximo 32 caracteres' })
      .refine(data => /[a-zA-Z]/.test(data), {
        message: 'A senha antiga deve conter pelo menos uma letra',
      })
      .refine(data => /\d/.test(data), {
        message: 'A senha antiga deve conter pelo menos um número',
      })
      .refine(data => /[^a-zA-Z0-9]/.test(data), {
        message: 'A senha antiga deve conter pelo menos um símbolo',
      }),
    newPassword: z
      .string()
      .min(8, { message: 'A nova senha deve ter pelo menos 8 caracteres' })
      .max(32, { message: 'A nova senha deve ter no máximo 32 caracteres' })
      .refine(data => /[a-zA-Z]/.test(data), {
        message: 'A nova senha deve conter pelo menos uma letra',
      })
      .refine(data => /\d/.test(data), {
        message: 'A nova senha deve conter pelo menos um número',
      })
      .refine(data => /[^a-zA-Z0-9]/.test(data), {
        message: 'A nova senha deve conter pelo menos um símbolo',
      }),
  })
  .refine(data => data.oldPassword !== data.newPassword, {
    message: 'A nova senha precisa ser diferente da antiga',
    path: ['newPassword'],
  });

export type PasswordUpdateSchemaType = z.infer<typeof passwordUpdateSchema>;
