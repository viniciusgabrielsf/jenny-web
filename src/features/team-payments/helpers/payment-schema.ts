import { z } from 'zod';

export const paymentSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(100, 'Título deve ter até 100 caracteres'),
  amount: z.number().min(1, 'Valor deve ser maior que zero'),
  debtors: z.array(z.any()).min(1, 'Adicione pelo menos um devedor'),
});

export type PaymentSchemaType = z.infer<typeof paymentSchema>;
