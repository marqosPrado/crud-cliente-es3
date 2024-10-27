import {ClienteDAO} from "../dao/ClienteDAO";
import express from "express";
import {Cliente} from "../domain/cliente/Cliente";
import {Validar} from "../strategy/Validar";
import {ValidarEmail} from "../strategy/ValidarEmail";
import {ValidarCpf} from "../strategy/ValidarCpf";

export class ClienteService {
  private clienteDAO: ClienteDAO;
  private validacoes: Array<Validar>

  constructor() {
    this.clienteDAO = new ClienteDAO();
    this.validacoes = new Array<Validar>()
  }

  async cadastrarCliente(req: express.Request, res: express.Response) {
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

    if (await this.eUsuarioCadastrado(cliente.email)) {
      throw new Error("Cliente já cadastrado")
    }

    if (await this.eCpfCadastrado(cliente.cpf)) {
      throw new Error("CPF já cadastrado")
    }

    return this.clienteDAO.save(cliente);
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