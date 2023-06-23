import { type } from "os";

    export type ArmazenaPagamentoInputDTO = {
        id_cliente: string,
        nomeTitular: string,
        numeroCartao: number,
        validadeCartao: number,
        codigoSeguranca: number
    }