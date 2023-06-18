import { SEXO } from "../model/FamiliaModel"

export type FamiliaInputDTO = {
    token: string,
    nome: string,
    idade: number,
    sexo: SEXO
    peso: number,
    id_cliente: string,
    id_plano: string
}