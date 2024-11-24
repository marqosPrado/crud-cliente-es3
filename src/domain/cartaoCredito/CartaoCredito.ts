import {BandeiraCartao} from "./enum/BandeiraCartao";

export class CartaoCredito {
  private readonly _id!: string;
  private readonly _nome!: string;
  private readonly _numero!: string;
  private readonly _bandeira!: BandeiraCartao;
  private readonly _validade!: string;
  private readonly _cvv!: string;
  private _ePrincipal!: boolean;

  constructor(
    nome: string,
    numero: string,
    bandeira: BandeiraCartao,
    validade: string,
    cvv: string,
    id?: string
  ) {
    this._nome = nome;
    this._numero = numero;
    this._bandeira = bandeira;
    this._validade = validade;
    this._cvv = cvv;
    this._ePrincipal = true;
    if (id) {
      this._id = id;
    }
  }

  get nome(): string {
    return this._nome;
  }


  get ePrincipal(): boolean {
    return this._ePrincipal;
  }

  set ePrincipal(value: boolean) {
    this._ePrincipal = value;
  }

  get id(): string {
    return this._id;
  }

  get numero(): string {
    return this._numero;
  }

  get bandeira(): string {
    return this._bandeira;
  }

  get validade(): string {
    return this._validade;
  }

  get cvv(): string {
    return this._cvv;
  }

}