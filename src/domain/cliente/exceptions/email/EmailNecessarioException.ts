import {Exception} from "../Exception";

export class EmailNecessarioException implements Exception {
  message: string;
  statusCode: number;

  constructor() {
    this.message = "E-mail precisa ser informado"
    this.statusCode = 422
  }
}