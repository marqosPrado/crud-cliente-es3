import {Exception} from "../Exception";

export class EmailFormatoException implements Exception {
  message: string;
  statusCode: number;

  constructor() {
    this.message = "Formato do e-mail está incorreto";
    this.statusCode = 422;
  }
}