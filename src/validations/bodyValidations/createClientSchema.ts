import {z} from "zod";
import {Genero} from "../../domain/cliente/enum/Genero";
import {TipoLogradouro} from "../../domain/endereco/enum/TipoLogradouro";
import {BandeiraCartao} from "../../domain/cartaoCredito/enum/BandeiraCartao";

export const createClientSchema = z.object({
  nome: z.string().min(3, "Nome precisa ser mair que 3 caracters"),
  dataNascimento: z.string().min(10).max(10),
  genero: z.nativeEnum(Genero, {
    errorMap: () => ({ message: "Gênero inválido" })
  }),
  email: z.string(),
  cpf: z.string(),
  telefone: z.string(),
  tipoTelefone: z.string(),
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
  cidade: z.string(),

  nomeImpresso: z.string().min(3).max(50),
  numeroCartao: z.string().min(16).max(16),
  bandeira: z.nativeEnum(BandeiraCartao, {
    errorMap: () => ({ message: "Bandeira do cartão inválida" })
  }),
  validade: z.string().min(7).max(7),
  cvv: z.string().min(3).max(3),
});