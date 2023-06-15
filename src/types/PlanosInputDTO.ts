import { TIPO } from "../model/PlanosModel"

export type PlanosInputDTO = {
    tipo: TIPO
    duracao: string,
    descricao: string,
    valor: number
}