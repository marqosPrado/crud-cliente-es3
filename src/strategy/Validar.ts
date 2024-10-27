import {Cliente} from "../domain/cliente/Cliente";

export interface Validar {
  processar(cliente: Cliente): void;
}