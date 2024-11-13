import {Estado} from "./Estado";

export class Pais {
  private _id!: number
  private _nome!: string
  private _codigo?: string
  private _estado!: Estado

  constructor(id: number, nome: string, estado: Estado) {
    this._nome = nome;
    this._estado = estado
    this._id = id;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get nome(): string {
    return this._nome;
  }

  set nome(value: string) {
    this._nome = value;
  }

  get codigo(): string | undefined {
    return this._codigo;
  }

  set codigo(value: string) {
    this._codigo = value;
  }


  get estado(): Estado {
    return this._estado;
  }

  set estado(value: Estado) {
    this._estado = value;
  }
}