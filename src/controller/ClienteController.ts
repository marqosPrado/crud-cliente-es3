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
      res.status(200).send(await this.clienteService.cadastrarCliente(req, res));
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  }

  private configurarRotas() {
    this.app.post('/cliente/cadastro', (req, res) => this.cadastrarCliente(req, res));
  }
}