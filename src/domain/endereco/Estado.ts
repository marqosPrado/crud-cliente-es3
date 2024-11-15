import {Cidade} from "./Cidade";

export class Estado {
  private _id!: number;
  private _nome!: string;
  private _codigo?: string;
  private _cidade!: Cidade

  constructor(id: number, nome: string, cidade: Cidade) {
    this._nome = nome;
    this._cidade = cidade;
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

  get cidade(): Cidade {
    return this._cidade;
  }

  set cidade(value: Cidade) {
    this._cidade = value;
  }
}