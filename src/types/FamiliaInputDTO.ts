import { SEXO } from "../model/FamiliaModel"

export type FamiliaInputDTO = {
    nome: string,
    idade: number,
    sexo: SEXO
    peso: number,
    id_cliente: string,
    id_plano: string
}