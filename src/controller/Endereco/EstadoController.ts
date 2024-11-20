import {Express, Request, Response} from "express";
import {EstadoService} from "../../service/Endereco/EstadoService";

export class EstadoController {
  private readonly app: Express;

  constructor(private readonly estadoService: EstadoService, app: Express) {
    this.app = app;
  }
  async getCidadesByEstado(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const cidades = await this.estadoService.findCidadesByEstado(parseInt(id));
      res.json(cidades);
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}