import { z } from 'zod';
export const logInSchema = z.object({
  email: z.email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(1, { message: 'A senha não pode ser vazia' })
    .max(32, { message: 'A senha deve ter no máximo 32 caracteres' }),
});

export type LogInSchemaType = z.infer<typeof logInSchema>;
