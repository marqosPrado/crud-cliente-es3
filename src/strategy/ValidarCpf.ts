import {Validar} from "./Validar";
import {Cliente} from "../domain/cliente/Cliente";
import {CpfNecessarioException} from "../domain/cliente/exceptions/cpf/CpfNecessarioException";
import {CpfInvalidoException} from "../domain/cliente/exceptions/cpf/CpfInvalidoException";

export class ValidarCpf implements Validar {
  processar(cliente: Cliente): void {
    const cpf: string = cliente.cpf;
    if (!cpf) {
      throw new CpfNecessarioException();
    }
    const replacedCpf = cpf.replace(/[.\-]/g, "").trim();
    const cpfRegex = /^\d{11}$/gm;
    if (!cpfRegex.test(replacedCpf)) {
      throw new CpfInvalidoException();
    }
  }
}