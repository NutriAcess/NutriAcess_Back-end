import { AVALIACAO } from "../model/FaleConoscoModel"

export type FaleConoscoInputDTO = {
    toekn: string,
    avaliacao: AVALIACAO,
    nome_usuario: string,
    email: string,
    mensagem: string,
    id_cliente: string
}