import { z } from 'zod';
export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
      .max(100, { message: 'O nome deve ter no máximo 100 caracteres' }),
    email: z.email({ message: 'Email inválido' }),
    birthDate: z.date().max(new Date(), { message: 'Data de nascimento deve ser anterior a hoje' }),
    password: z
      .string()
      .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
      .max(32, { message: 'A senha deve ter no máximo 32 caracteres' })
      .refine(data => /[a-zA-Z]/.test(data), {
        message: 'A senha deve conter pelo menos uma letra',
      })
      .refine(data => /\d/.test(data), {
        message: 'A senha deve conter pelo menos um número',
      })
      .refine(data => /[^a-zA-Z0-9]/.test(data), {
        message: 'A senha deve conter pelo menos um símbolo',
      }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas precisam ser iguais',
    path: ['confirmPassword'],
  });

export type signUpSchemaType = z.infer<typeof signUpSchema>;
