import {ClienteDAO} from "../dao/ClienteDAO";
import express from "express";
import {Cliente} from "../domain/cliente/Cliente";
import {Validar} from "../strategy/Validar";
import {ValidarEmail} from "../strategy/ValidarEmail";
import {ValidarCpf} from "../strategy/ValidarCpf";
import {EmailCadastradoException} from "../domain/cliente/exceptions/email/EmailCadastradoException";
import {CpfCadastradoException} from "../domain/cliente/exceptions/cpf/CpfCadastradoException";

export class ClienteService {
  private clienteDAO: ClienteDAO;
  private validacoes: Array<Validar>

  constructor() {
    this.clienteDAO = new ClienteDAO();
    this.validacoes = new Array<Validar>()
  }

  async cadastrarCliente(req: express.Request) {
    this.validacoes.push(new ValidarEmail())
    this.validacoes.push(new ValidarCpf())
    const response = req.body

    const cliente = new Cliente(
        response.nome,
        response.dataNascimento,
        response.genero,
        response.email,
        response.cpf,
        response.senha
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