import {Exception} from "../Exception";

export class CpfCadastradoException implements Exception {
  message: string;
  statusCode: number;

  constructor() {
    this.message = "Cpf já cadastrado";
    this.statusCode = 409;
  }
}