import {Validar} from "./Validar";
import {Cliente} from "../domain/cliente/Cliente";

export class ValidarEmail implements Validar {
  processar(cliente: Cliente): void {
    const email: string = cliente.email;
    if (!email) {
      throw new Error("E-mail precisa ser informado");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/gm;
    if (!emailRegex.test(email)) {
      throw new Error("E-mail inválido");
    }
  }
}