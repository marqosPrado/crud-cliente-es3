import { Express, Response, Request } from "express";
import { z } from "zod";
import { ClienteService } from "../service/ClienteService";
import { createClientSchema } from "../validations/bodyValidations/createClientSchema";
import { validationSchema } from "../middlewares/client/validationSchema";
import {EnderecoService} from "../service/Endereco/EnderecoService";
import {PaisDAO} from "../dao/endereco/PaisDAO";
import {EstadoDAO} from "../dao/endereco/EstadoDAO";
import {CidadeDAO} from "../dao/endereco/CidadeDAO";
import {Cidade} from "../domain/endereco/Cidade";
import {Estado} from "../domain/endereco/Estado";
import { Pais } from "../domain/endereco/Pais";
import {Endereco} from "../domain/endereco/Endereco";

export class ClienteController {
  private readonly paisDao: PaisDAO;
  private readonly estadoDao: EstadoDAO;
  private readonly cidadeDao: CidadeDAO;
  private readonly app: Express;

  constructor(private readonly clienteService: ClienteService, private readonly enderecoService: EnderecoService, app: Express) {
    this.app = app;
    this.paisDao = new PaisDAO();
    this.estadoDao = new EstadoDAO();
    this.cidadeDao = new CidadeDAO();
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

  async addEndereco(req: Request, res: Response) {
    console.log("chegou aqui")
    try {
      const clientId = Number(req.params.id);

      const {
        tipoLogradouro,
        logradouro,
        numero,
        bairro,
        cep,
        complemento,
        pais,
        estado,
        cidade,
        eEnderecoEntrega,
        observacoes,
      } = req.body;

      const [paisId, estadoId, cidadeId] = await Promise.all([
        this.paisDao.findById(Number(pais)),
        this.estadoDao.findById(Number(estado)),
        this.cidadeDao.findById(Number(cidade))
      ]);


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

      const newEndereco = await this.enderecoService.save(endereco, clientId);
      res.status(201).send(newEndereco);
    } catch (error) {
      res.status(500).send("Houve um problema inesperado, tente novamente mais tarde")
    }
  }

  async paginaAddEndereco(req: Request, res: Response) {
    try {
      const clientId = Number(req.params.id);
      const cliente = await this.clienteService.findClientById(clientId);
      const enderecos = cliente.enderecos;
      res.status(200).render("enderecos-new.ejs", { enderecos: enderecos });
    } catch (error) {
      res.status(500).send("Houve um problema inesperado, tente novamente mais tarde");
    }
  }

  async paginaEditEndereco(req: Request, res: Response) {
    try {
      const addressId = Number(req.params.id);
      const address = await this.enderecoService.findEndereco(addressId);
      console.log(address)
      res.status(200).render("enderecos-edit.ejs", { endereco: address });
    } catch (error) {
      res.status(500).send("Houve um problema inesperado, tente novamente mais tarde");
    }
  }

  async editEndereco(req: Request, res: Response) {
    try {
      const addressId = Number(req.params.id);

      const {
        tipoLogradouro,
        logradouro,
        numero,
        bairro,
        cep,
        complemento,
        pais,
        estado,
        cidade,
        eEnderecoEntrega,
        observacoes,
      } = req.body;

      const [paisId, estadoId, cidadeId] = await Promise.all([
        this.paisDao.findById(Number(pais)),
        this.estadoDao.findById(Number(estado)),
        this.cidadeDao.findById(Number(cidade))
      ]);


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

      const address = await this.enderecoService.editEndereco(addressId, endereco);
      res.status(200).send(address);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async clienteConsulta(req: Request, res: Response) {
    try {
      const { nome, cpf, email, telefone } = req.body;
      const clientes = await this.clienteService.findClientByFilter({ nome, cpf, email });
      res.status(200).send(clientes);
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

    this.app.get(
      "/cliente/:id/enderecos/new",
      this.paginaAddEndereco.bind(this)
    )

    this.app.post(
      "/cliente/:id/enderecos/new",
      this.addEndereco.bind(this)
    )

    this.app.get(
      "/cliente/endereco/:id/edit",
      this.paginaEditEndereco.bind(this)
    )

    this.app.post(
      "/cliente/endereco/:id/edit",
      this.editEndereco.bind(this)
    )

    this.app.post(
      "/cliente/consulta",
      this.clienteConsulta.bind(this)
    )
  }
}