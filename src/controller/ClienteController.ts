import { Express, Response, Request } from "express";
import { z } from "zod";
import { ClienteService } from "../service/ClienteService";
import { createClientSchema } from "../validations/bodyValidations/createClientSchema";
import { validationSchema } from "../middlewares/client/validationSchema";

export class ClienteController {
  private readonly app: Express;

  constructor(private readonly clienteService: ClienteService, app: Express) {
    this.app = app;
    this.configurarRotas();
  }

  async cadastrarCliente(req: Request, res: Response): Promise<void> {
    try {
      let parsedClient = req.body;
      const addressNumber = parseInt(parsedClient.numero);
      parsedClient = { ...parsedClient, numero: addressNumber };
      const createdClient = await this.clienteService.cadastrarCliente(parsedClient);
      res.status(201).send(createdClient);
    } catch (e: any) {
      if (e instanceof z.ZodError) {
        res.status(400).json({
          message: "Erro de validação",
          errors: e.errors.map((err) => ({
            campo: err.path.join("."),
            mensagem: err.message,
          })),
        });
      } else {
        res.status(e.statusCode || 500).send({
          status: e.statusCode,
          message: e.message
        });
      }
    }
  }

  async paginaCadastro(req: Request, res: Response) {
    try {
      res.status(200).render("cadastro.ejs");
    } catch (e) {
      res.status(500).send("Houve um problema inesperado, tente novamente mais tarde");
    }
  }

  private configurarRotas() {
    this.app.post(
      "/cliente/cadastro",
      validationSchema(createClientSchema),
      this.cadastrarCliente.bind(this)
    );

    this.app.get(
      "/cliente/cadastro",
      this.paginaCadastro.bind(this));
  }
}