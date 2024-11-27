import {EnderecoDAO} from "../../dao/endereco/EnderecoDAO";
import {Endereco} from "../../domain/endereco/Endereco";
import {ClienteDAO} from "../../dao/ClienteDAO";
import {CidadeDAO} from "../../dao/endereco/CidadeDAO";
import {EstadoDAO} from "../../dao/endereco/EstadoDAO";
import {PaisDAO} from "../../dao/endereco/PaisDAO";

export class EnderecoService {
  private readonly clienteDAO: ClienteDAO;
  private readonly cidadeDAO: CidadeDAO;
  private readonly estadoDAO: EstadoDAO;
  private readonly paisDAO: PaisDAO;
  private readonly enderecoRepository: EnderecoDAO;

  constructor() {
    this.clienteDAO = new ClienteDAO();
    this.cidadeDAO = new CidadeDAO();
    this.estadoDAO = new EstadoDAO();
    this.paisDAO = new PaisDAO();
    this.enderecoRepository = new EnderecoDAO();
  }

  async save(endereco: Endereco, clienteId: number) {
    await this.enderecoRepository.save(endereco, clienteId);
  }

  async findEndereco(enderecoId: number) {
    const endereco = await this.enderecoRepository.findById(enderecoId);
    if (!endereco) {
      throw new Error('Endereço não encontrado');
    }
    return endereco;
  }

  async editEndereco(addresId: number, endereco: Endereco) {
    const updatedAddress = await this.enderecoRepository.update(addresId, endereco)
    return updatedAddress;
  }
}