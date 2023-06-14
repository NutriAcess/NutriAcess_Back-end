export enum OBJETIVO{
perder_peso = "perder peso",
manter_peso = "manter peso",
ganhar_massa = "ganhar massa"
}

export enum GENERO {
    homem = "homem",
    mulher = "mulher",
    outro = "outro"
}

export enum CAPACIDADE_FISICA {
    sedentarismo = "sedentarismo",
    moderada = "atividade fisica moderada",
    intensa = "atividade fisica intensa"
}

export enum RESTRICAO_ALIMENTAR {
    qualquer = "qualquer coisa",
    vegetariano = "vegetariano",
    vegano = "vegano"
}

export enum TEMPO_PREPARO {
    sim = "sim",
    nao = "não"
}


export class FormularioModel {
constructor(
    private id_formulario: string,
    private nome: string,
    private objetivo: OBJETIVO,
    private genero: GENERO,
    private altura: number,
    private idade: number,
    private peso: number,
    private capacidade_fisica: CAPACIDADE_FISICA,
    private restricao_alimentar: RESTRICAO_ALIMENTAR,
    private tempo_preparo: TEMPO_PREPARO,
    private foto: string,
    private id_cliente: string

)
  {}

  getId_formulaio = () : string => {
    return this.id_formulario
  }

  getNome = () : string => {
    return this.nome
  }

  getObjetivo = () : OBJETIVO => {
    return this.objetivo
  }

  getGenero = () : GENERO => {
    return this.genero
  }

  getAltura = () : number => {
    return this.altura
  }

  getIdade = () : number => {
    return this.idade
  }

  getPeso = () : number => {
    return this.peso
  }

  getCapacidade_fisica = () : CAPACIDADE_FISICA => {
    return this.capacidade_fisica
  }

  getRestricao_alimentar = () : RESTRICAO_ALIMENTAR => {
    return this.restricao_alimentar
  } 

  getTempo_preparo = () : TEMPO_PREPARO => {
    return this.tempo_preparo
  }

  getFoto = () : string => {
    return this.foto
  }

  getId_cliente = () : string => {
    return this.id_cliente
  }

  static toFormularioModel (data:any): FormularioModel {
    return new FormularioModel(data.id_formulario,data.nome,data.objetivo,data.genero,
        data.altura,data.idade,data.peso,data.capacidade_fisica,data.restricao_alimentar,
        data.tempo_preparo,data.foto,data.id_cliente);
  }
}