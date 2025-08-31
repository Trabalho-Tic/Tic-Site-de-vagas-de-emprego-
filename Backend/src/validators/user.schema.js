const { z } = require('zod');

// Campos exigidos no cadastro:
const userCreateSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  cpf: z.string().min(11, 'CPF deve ter pelo menos 11 caracteres'), // ajuste se quiser máscara
  telefone: z.string().min(8, 'Telefone deve ter pelo menos 8 caracteres'),
  typeUser: z.enum(['CANDIDATO', 'EMPRESA']),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
});

// Para update (opcional): todos os campos opcionais
const userUpdateSchema = userCreateSchema.partial();

module.exports = { userCreateSchema, userUpdateSchema };