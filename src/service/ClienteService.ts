import {ClienteDAO} from "../dao/ClienteDAO";
import express from "express";
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

export class ClienteService {
  private clienteDAO: ClienteDAO;
  private cidadeDAO: CidadeDAO;
  private estadoDAO: EstadoDAO;
  private paisDAO: PaisDAO;
  private validacoes: Array<Validar>

  constructor() {
    this.clienteDAO = new ClienteDAO();
    this.cidadeDAO = new CidadeDAO();
    this.estadoDAO = new EstadoDAO();
    this.paisDAO = new PaisDAO();
    this.validacoes = new Array<Validar>()
  }

  async cadastrarCliente(req: express.Request) {
    this.validacoes.push(new ValidarEmail())
    this.validacoes.push(new ValidarCpf())

    const { nome, dataNascimento, genero, email, cpf, senha } = req.body

    const {
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
      cidade
    } = req.body

    const [paisId, estadoId, cidadeId] = await Promise.all([
      this.paisDAO.findByName(pais),
      this.estadoDAO.findByName(estado),
      this.cidadeDAO.findByName(cidade)
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
    const estadoEntity = new Estado(estadoId.id, estadoId.nome, cidade);
    const paisEntity = new Pais(paisId.id, paisId.nome, estado);
    const endereco = new Endereco(
      logradouro,
      tipoLogradouro,
      numero,
      bairro,
      cep,
      observacoes,
      complemento,
      eEnderecoEntrega,
      cidadeEntity,
      estadoEntity,
      paisEntity
    );

    const cliente = new Cliente(
      nome,
      dataNascimento,
      genero,
      email,
      cpf,
      senha,
      endereco
    );
    this.validacoes.forEach((validacao) => validacao.processar(cliente))
    await this.validarCliente(cliente);
    return this.clienteDAO.save(cliente);
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
}