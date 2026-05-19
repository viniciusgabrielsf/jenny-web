import { z } from 'zod';

export const teamSchema = z.object({
  name: z.string().min(1, 'Nome do time é obrigatório').max(50, 'Nome deve ter até 50 caracteres'),
  members: z.array(z.any()).min(1, 'Adicione pelo menos um membro'),
});

export type TeamSchemaType = z.infer<typeof teamSchema>;
