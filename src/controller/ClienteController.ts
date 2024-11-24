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

  async editarCliente(req: Request, res: Response): Promise<void> {
    type EditarCliente = {
      nome: string;
      cpf: string;
      genero: string;
    }

    const { nome, cpf, genero } = req.body as EditarCliente;
    try {
      const clientId = Number(req.params.id);
      const updatedClient = await this.clienteService.editClient(clientId, { nome, cpf, genero });
      res.status(200).send(updatedClient);
    } catch (error) {
      res.status(500).send("Houve um problema inesperado, tente novamente mais tarde");
    }
  }

  async paginaCadastro(req: Request, res: Response) {
    try {
      res.status(200).render("cadastro.ejs");
    } catch (e) {
      res.status(500).send("Houve um problema inesperado, tente novamente mais tarde");
    }
  }

  async paginaConsulta(req: Request, res: Response) {
    try {
      const clientes = await this.clienteService.findAllActiveClients();
      res.status(200).render("consulta.ejs", { clientes: clientes });

    } catch (e) {
      res.status(500).send("Houve um problema inesperado, tente novamente mais tarde");
    }
  }

  async paginaDetalhes(req: Request, res: Response) {
    try {
      const clientId = Number(req.params.id);
      const cliente = await this.clienteService.findClientById(clientId);
      res.status(200).render("detalhes.ejs", { cliente: cliente });
    } catch (error) {
      res.status(200).render("detalhes.ejs");
    }
  }

  async paginaEdicao(req: Request, res: Response) {
    try {
      const clientId = Number(req.params.id);
      const cliente = await this.clienteService.findClientById(clientId);
      const data = {
        nome: cliente.nome,
        cpf: cliente.cpf,
        genero: cliente.genero
      }
      res.status(200).render("dados-pessoais.ejs", { cliente: data });
    } catch (error) {
      res.status(200).render("dados-pessoais.ejs");
    }
  }

  async disableClient(req: Request, res: Response) {
    try {
      const clientId = Number(req.params.clientId);
      await this.clienteService.disableClient(clientId);
      res.status(200).send("Cliente desativado com sucesso!");
    } catch (error) {
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

    this.app.get(
      "/cliente/consulta",
      this.paginaConsulta.bind(this)
    )

    this.app.patch(
      "/cliente/:clientId/desativar",
      this.disableClient.bind(this)
    )

    this.app.get(
      "/cliente/:id/detalhes",
      this.paginaDetalhes.bind(this)
    )

    this.app.get(
      "/cliente/:id/edicao",
      this.paginaEdicao.bind(this)
    )

    this.app.patch(
      "/cliente/:id/edicao",
      this.editarCliente.bind(this)
    )
  }
}