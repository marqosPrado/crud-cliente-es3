import {PaisDAO} from "../../dao/endereco/PaisDAO";
import {Pais} from "../../domain/endereco/Pais";
import {Estado} from "../../domain/endereco/Estado";


export class PaisService {
  private readonly paisDAO : PaisDAO;

  constructor() {
    this.paisDAO = new PaisDAO();
  }

  async findAll() {
    const paises = await this.paisDAO.findAll();
    return paises.map(pais => {
      const estados: Estado[] = pais.estados.map(
        estado => new Estado(estado.id, estado.nome)
      );
      return new Pais(pais.id, pais.nome, estados);
    })
  }

  async findEstadoByPais(paisId: number) {
    const estadosData = await this.paisDAO.findEstadosByPais(paisId);
    return estadosData.map(estado => new Estado(estado.id, estado.nome));
  }
}