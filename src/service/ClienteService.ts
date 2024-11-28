import {ClienteDAO} from "../dao/ClienteDAO";
import { z } from "zod";
import bcrypt from 'bcrypt';
import {Cliente} from "../domain/cliente/Cliente";
import {Validar} from "../strategy/Validar";
import {ValidarEmail} from "../strategy/ValidarEmail";
import {ValidarCpf} from "../strategy/ValidarCpf";
import {EmailCadastradoException} from "../domain/cliente/exceptions/email/EmailCadastradoException";
import {CpfCadastradoException} from "../domain/cliente/exceptions/cpf/CpfCadastradoException";
import {CidadeDAO} from "../dao/endereco/CidadeDAO";
import {EstadoDAO} from "../dao/endereco/EstadoDAO";
import {PaisDAO} from "../dao/endereco/PaisDAO";
import {Cidade} from "../domain/endereco/Cidade";
import {Estado} from "../domain/endereco/Estado";
import {Pais} from "../domain/endereco/Pais";
import {Endereco} from "../domain/endereco/Endereco";
import {createClientSchema} from "../validations/bodyValidations/createClientSchema";
import {CartaoCredito} from "../domain/cartaoCredito/CartaoCredito";

export class ClienteService {
  private readonly clienteDAO: ClienteDAO;
  private readonly cidadeDAO: CidadeDAO;
  private readonly estadoDAO: EstadoDAO;
  private readonly paisDAO: PaisDAO;
  private validacoes: Array<Validar>
  private SALTROUNDS = 10;

  constructor() {
    this.clienteDAO = new ClienteDAO();
    this.cidadeDAO = new CidadeDAO();
    this.estadoDAO = new EstadoDAO();
    this.paisDAO = new PaisDAO();
    this.validacoes = new Array<Validar>()
  }

  async cadastrarCliente(clienteData: z.infer<typeof createClientSchema>) {
    this.validacoes.push(new ValidarEmail())
    this.validacoes.push(new ValidarCpf())

    const {
      nome,
      dataNascimento,
      genero,
      email,
      cpf,
      telefone,
      senha,
      logradouro,
      tipoLogradouro,
      numero,
      bairro,
      cep,
      complemento,
      eEnderecoEntrega,
      observacoes,
      pais,
      estado,
      cidade,
      nomeImpresso,
      numeroCartao,
      bandeira,
      validade,
      cvv
    } = clienteData;

    const hashedPassaword = await bcrypt.hash(senha, this.SALTROUNDS);

    const [paisId, estadoId, cidadeId] = await Promise.all([
      this.paisDAO.findById(parseInt(pais)),
      this.estadoDAO.findById(parseInt(estado)),
      this.cidadeDAO.findById(parseInt(cidade))
    ])

    if (!paisId) {
      throw new Error('País não encontrado')
    }

    if (!estadoId) {
      throw new Error('Estado não encontrado')
    }

    if (!cidadeId) {
      throw new Error('Cidade não encontrada')
    }

    const cidadeEntity = new Cidade(cidadeId.id, cidadeId.nome);
    const estadoEntity = new Estado(estadoId.id, estadoId.nome);
    estadoEntity.cidade = cidadeEntity;

    const paisEntity = new Pais(paisId.id, paisId.nome, [estadoEntity], paisId.codigo);
    paisEntity.estado = [estadoEntity];

    const tipoEndereco = eEnderecoEntrega === 'true'
    let parsedNum;
    try {
      parsedNum = parseInt(numero)
    } catch (error) {
      throw new Error('Número inválido')
    }

    const endereco = new Endereco(
      logradouro,
      tipoLogradouro,
      parsedNum,
      bairro,
      cep,
      observacoes,
      complemento,
      tipoEndereco,
      cidadeEntity,
      estadoEntity,
      paisEntity
    );

    const cartao = new CartaoCredito(
      nomeImpresso,
      numeroCartao,
      bandeira,
      validade,
      cvv
    )

    const cliente = new Cliente(
      nome,
      dataNascimento,
      genero,
      email,
      cpf,
      telefone,
      hashedPassaword,
      endereco,
      cartao
    );
    this.validacoes.forEach((validacao) => validacao.processar(cliente))
    await this.validarCliente(cliente);
    return this.clienteDAO.save(cliente);
  }

  async disableClient(clientId: number) {
    return this.clienteDAO.disableClient(clientId);
  }

  async findClientById(clientId: number) {
    const client = await this.clienteDAO.findClientById(clientId);
    if (!client) {
      throw new Error('Cliente não encontrado')
    }
    return client;
  }

  async editClient(clientId: number, clientData: { nome: string, cpf: string, genero: string, telefone: string }) {
    const client = await this.clienteDAO.findClientById(clientId);
    if (!client) {
      throw new Error('Cliente não encontrado')
    }

    const cpfAlreadyExists = await this.clienteDAO.findByCpf(clientData.cpf);
    if (cpfAlreadyExists && cpfAlreadyExists.id !== clientId) {
      throw new Error('CPF já cadastrado');
    }

    const updatedClient = await this.clienteDAO.updateClient(clientId, clientData);
    return updatedClient;
  }

  async findClientByFilter(filter: { nome: string, cpf: string, email: string }) {
    return this.clienteDAO.findClientByFilter(filter);
  }

  private async validarCliente(cliente: Cliente) {
    if (await this.eUsuarioCadastrado(cliente.email)) {
      throw new EmailCadastradoException();
    }

    if (await this.eCpfCadastrado(cliente.cpf)) {
      throw new CpfCadastradoException();
    }
  }

  private async eUsuarioCadastrado(email: string): Promise<boolean> {
    const emailCliente = await this.clienteDAO.findByUser(email);
    return emailCliente !== null;
  }

  private async eCpfCadastrado(cpf: string): Promise<boolean> {
    const cpfCliente = await this.clienteDAO.findByCpf(cpf)
    return cpfCliente !== null;
  }

  async findAllActiveClients() {
    return this.clienteDAO.findAllActiveClients();
  }

  private toString(date: Date) {
    return date.toString();
  }

}