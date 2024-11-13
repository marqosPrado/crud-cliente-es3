export class Cidade {
  private _id!: number;
  private _nome!: string;

  constructor(id: number, nome: string) {
    this._nome = nome
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
}