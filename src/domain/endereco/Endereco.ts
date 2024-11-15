import {TipoLogradouro} from "./enum/TipoLogradouro";
import {Cidade} from "./Cidade";
import {Estado} from "./Estado";
import {Pais} from "./Pais";

export class Endereco {
  private _id!: number
  private _logradouro!: string
  private _tipoLograduro!: TipoLogradouro
  private _numero!: number
  private _bairro!: string
  private _cep!: string
  private _observacoes?: string
  private _complemento?: string
  private _eEnderecoEntrega!: boolean
  private _cidade!: Cidade
  private _estado!: Estado
  private _pais!: Pais

  constructor(
    logradouro: string,
    tipoLogradouro: TipoLogradouro,
    numero: number,
    bairro: string,
    cep: string,
    observacoes: string,
    complemento: string,
    eEnderecoEntrega: boolean,
    cidade: Cidade,
    estado: Estado,
    pais: Pais
  ) {
    this._logradouro = logradouro;
    this._tipoLograduro = tipoLogradouro;
    this._numero = numero;
    this._bairro = bairro;
    this._cep = cep;
    this._observacoes = observacoes;
    this._complemento = complemento;
    this._eEnderecoEntrega = eEnderecoEntrega;
    this._cidade = cidade;
    this._estado = estado;
    this._pais = pais
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get logradouro(): string {
    return this._logradouro;
  }

  set logradouro(value: string) {
    this._logradouro = value;
  }


  get tipoLograduro(): TipoLogradouro {
    return this._tipoLograduro;
  }

  set tipoLograduro(value: TipoLogradouro) {
    this._tipoLograduro = value;
  }

  get numero(): number {
    return this._numero;
  }

  set numero(value: number) {
    if (value <= 0) {
      throw new Error("Número do endereço inválido")
    }
    this._numero = value;
  }

  get bairro(): string {
    return this._bairro;
  }

  set bairro(value: string) {
    this._bairro = value;
  }

  get cep(): string {
    return this._cep;
  }

  set cep(value: string) {
    this._cep = value;
  }

  get observacoes(): string | undefined {
    return this._observacoes;
  }

  set observacoes(value: string) {
    this._observacoes = value;
  }

  get complemento(): string | undefined {
    return this._complemento;
  }

  set complemento(value: string) {
    this._complemento = value;
  }

  get eEnderecoEntrega(): boolean {
    return this._eEnderecoEntrega;
  }

  set eEnderecoEntrega(value: boolean) {
    this._eEnderecoEntrega = value;
  }

  get cidade(): Cidade {
    return this._cidade;
  }

  set cidade(value: Cidade) {
    this._cidade = value;
  }

  get estado(): Estado {
    return this._estado;
  }

  set estado(value: Estado) {
    this._estado = value;
  }

  get pais(): Pais {
    return this._pais;
  }

  set pais(value: Pais) {
    this._pais = value;
  }
}