import { EstadoDAO } from "../../dao/endereco/EstadoDAO";
import {Cidade} from "../../domain/endereco/Cidade";

export class EstadoService {
  private readonly estadoDAO: EstadoDAO;

  constructor() {
    this.estadoDAO = new EstadoDAO();
  }

  async findCidadesByEstado(estadoId: number) {
    const cidadesData = await this.estadoDAO.findCidadesByEstado(estadoId);
    return cidadesData.map(cidade => new Cidade(cidade.id, cidade.nome));
  }
}