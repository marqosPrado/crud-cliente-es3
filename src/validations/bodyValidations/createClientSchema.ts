import {z} from "zod";
import {Genero} from "../../domain/cliente/enum/Genero";
import {TipoLogradouro} from "../../domain/endereco/enum/TipoLogradouro";

export const createClientSchema = z.object({
  nome: z.string().min(3, "Nome precisa ser mair que 3 caracters"),
  dataNascimento: z.string().min(10).max(10),
  genero: z.nativeEnum(Genero, {
    errorMap: () => ({ message: "Gênero inválido" })
  }),
  email: z.string(),
  cpf: z.string(),
  senha: z.string(),
  logradouro: z.string(),
  tipoLogradouro: z.nativeEnum(TipoLogradouro, {
    errorMap: () => ({ message: "Tipo de logradouro inválido" })
  }),
  numero: z.string(),
  bairro: z.string(),
  cep: z.string().min(9).max(9),
  complemento: z.string().optional().default(""),
  eEnderecoEntrega: z.string(),
  observacoes: z.string().max(255).optional().default(""),
  pais: z.string(),
  estado: z.string(),
  cidade: z.string()
});