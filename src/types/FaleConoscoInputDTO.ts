import { AVALIACAO } from "../model/FaleConoscoModel"

export type FaleConoscoInputDTO = {
    avaliacao: AVALIACAO,
    nome_usuario: string,
    email: string,
    mensagem: string,
    id_cliente: string
}