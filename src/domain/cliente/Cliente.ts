import {Genero} from "./enum/Genero";

export class Cliente {
  private _id?: number;
  private _nome!: string;
  private _dataNascimento!: Date;
  private _genero!: Genero;
  private _codigo!: string;
  private _email!: string;
  private _cpf!: string;
  private _senha!: string;
  private _status!: boolean;

  constructor(nome: string, dataNascimento: string, genero: Genero, email: string, cpf: string, senha: string) {
    this._nome = nome;
    this.dataNascimento = dataNascimento;
    this._genero = genero;
    this._email = email;
    this._cpf = cpf;
    this._senha = senha;
    this._status = true;
    this._codigo = this.gerarCodigo();
  }

  private gerarCodigo(): string {
    let codigo: string = "";
    const CARACTERES: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const TAMANHO: number = 6;
    
    for (let i = 0; i < TAMANHO; i++) {
      codigo += CARACTERES.charAt(Math.floor(Math.random() * CARACTERES.length));
    }
    return codigo;
  }

  get nome(): string {
    return this._nome;
  }

  set nome(value: string) {
    this._nome = value;
  }

  get id(): number | undefined {
    return this._id;
  }

  get dataNascimento(): Date {
    return this._dataNascimento;
  }

  set dataNascimento(value: string) {
    const [dia, mes, ano] = value.split("-").map(Number);
    const date = new Date(ano, mes - 1, dia);
    if (date.getMonth() < 1 || date.getMonth() > 12) {
      throw new Error("Mês inválido");
    }
    if (date.getDate() < 1 || date.getDate() > 31) {
      throw new Error("Dia inválido");
    }
    if (date.getFullYear() < 1900 || date.getFullYear() > new Date().getFullYear()) {
      throw new Error("Ano inválido");
    }
    this._dataNascimento = date;
  }

  get genero(): Genero {
    return this._genero;
  }

  set genero(value: Genero) {
    this._genero = value;
  }

  get codigo(): string {
    return this._codigo;
  }

  set codigo(value: string) {
    this._codigo = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get cpf(): string {
    return this._cpf;
  }

  set cpf(value: string) {
    this._cpf = value;
  }

  get senha(): string {
    return this._senha;
  }

  set senha(value: string) {
    this._senha = value;
  }

  get status(): boolean {
    return this._status;
  }

  set status(value: boolean) {
    this._status = value;
  }
}