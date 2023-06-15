import { CAPACIDADE_FISICA, GENERO, OBJETIVO, RESTRICAO_ALIMENTAR, TEMPO_PREPARO } from "../model/FormularioModel"

export type FormularioInputDTO = {
  nome: string,
  objetivo: OBJETIVO,
  genero: GENERO,
  altura: number,
  idade: number,
  peso: number,
  capacidade_fisica: CAPACIDADE_FISICA,
  restricao_alimentar: RESTRICAO_ALIMENTAR,
  tempo_preparo: TEMPO_PREPARO,
  foto?: string
}