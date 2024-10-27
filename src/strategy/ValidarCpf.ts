import {Validar} from "./Validar";
import {Cliente} from "../domain/cliente/Cliente";

export class ValidarCpf implements Validar {
  processar(cliente: Cliente): void {
    const cpf: string = cliente.cpf;
    if (!cpf) {
      throw new Error("CPF precisa ser informado");
    }
    const replacedCpf = cpf.replace(/[.\-]/g, "").trim();
    const cpfRegex = /^\d{11}$/gm;
    if (!cpfRegex.test(replacedCpf)) {
      throw new Error("CPF inválido");
    }
  }
}