import express, {Express} from "express";
import {ClienteService} from "../service/ClienteService";

export class ClienteController {
  private app: Express;

  constructor(private clienteService: ClienteService, app: Express) {
    this.app = app;
    this.configurarRotas();
  }

  async cadastrarCliente(req: express.Request, res: express.Response) {
    try {
      res.status(201).send(await this.clienteService.cadastrarCliente(req));
    } catch (e: any) {
      res.status(e.statusCode).send(e);
    }
  }

  async paginaCadastro(req: express.Request, res: express.Response) {
    try {
      res.status(200).render('cadastro.ejs')
    } catch (e) {
      res.status(500).send("Houve um problema inesperado, tente novamente mais tarde")
    }
  }

  private configurarRotas() {
    this.app.post('/cliente/cadastro', (req, res) => this.cadastrarCliente(req, res));
    this.app.get('/cliente/cadastro', (req, res) => this.paginaCadastro(req, res));
  }
}