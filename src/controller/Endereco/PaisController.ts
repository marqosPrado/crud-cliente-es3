import {PaisService} from "../../service/Endereco/PaisService";
import {Express, Request, Response} from "express";
import {EstadoController} from "./EstadoController";

export class PaisController {
  private readonly app: Express;
  private readonly estadoController: EstadoController;

  constructor(private readonly paisService: PaisService, app: Express, estadoController: EstadoController) {
    this.app = app
    this.estadoController = estadoController
    this.configurarRotas();
  }

  async getAllPaises(req: Request, res: Response) {
    try {
      const paises = await this.paisService.findAll();
      res.json(paises);
    } catch (erro) {
      res.status(500).json({message: "Erro interno do servidor."});
    }
  }

  async getEstadosByPais(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const estados = await this.paisService.findEstadoByPais(parseInt(id));
      res.json(estados);
    } catch (error) {
      console.error("Erro ao buscar estados:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  private configurarRotas() {
      this.app.get(
        "/paises",
        this.getAllPaises.bind(this)
      )

    this.app.get(
      "/paises/:id/estados",
      this.getEstadosByPais.bind(this)
    )

    this.app.get(
      "/estados/:id/cidades",
      (req, res) => this.estadoController.getCidadesByEstado(req, res)
    )
  }
}