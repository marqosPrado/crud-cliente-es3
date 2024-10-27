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

  private configurarRotas() {
    this.app.post('/cliente/cadastro', (req, res) => this.cadastrarCliente(req, res));
  }
}