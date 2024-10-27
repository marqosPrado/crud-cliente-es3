import {Exception} from "../Exception";

export class EmailCadastradoException implements Exception{
  message: string;
  statusCode: number;

  constructor() {
    this.message = "E-mail já cadastrado"
    this.statusCode = 409
  }
}