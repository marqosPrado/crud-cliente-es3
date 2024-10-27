import {Exception} from "../Exception";

export class CpfInvalidoException implements Exception {
  message: string;
  statusCode: number;

  constructor() {
    this.message = "CPF inválido"
    this.statusCode = 422
  }
}