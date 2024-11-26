import {EnderecoDAO} from "../../dao/endereco/EnderecoDAO";
import {Endereco} from "../../domain/endereco/Endereco";

export class EnderecoService {
  private readonly enderecoRepository: EnderecoDAO;

  constructor() {
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
}