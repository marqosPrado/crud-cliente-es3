import {Exception} from "../Exception";

export class CpfNecessarioException implements Exception {
  message: string;
  statusCode: number;

  constructor() {
    this.message = "CPF precisa ser informado"
    this.statusCode = 422
  }
}