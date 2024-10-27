import {Validar} from "./Validar";
import {Cliente} from "../domain/cliente/Cliente";
import {EmailNecessarioException} from "../domain/cliente/exceptions/email/EmailNecessarioException";
import {EmailFormatoException} from "../domain/cliente/exceptions/email/EmailFormatoException";

export class ValidarEmail implements Validar {
  processar(cliente: Cliente): void {
    const email: string = cliente.email;
    if (!email) {
      throw new EmailNecessarioException();
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/gm;
    if (!emailRegex.test(email)) {
      throw new EmailFormatoException();
    }
  }
}