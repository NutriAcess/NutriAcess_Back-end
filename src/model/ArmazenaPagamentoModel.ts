export class ArmazenaPagamentoModel {
    constructor(
    private id_pagamento: string,
    private id_cliente: string,
    private nomeTitular: string,
    private numeroCartao: number,
    private validadeCartao: number,
    private codigoSeguranca: number
    ){}

    getId_pagamento = () : string => {
        return this.id_pagamento
    }

    getId_cliente = () : string => {
        return this.id_cliente
    }

    getNomeTitular = () : string => {
        return this.nomeTitular
    }

    getNumeroCartao = () : number => {
        return this.numeroCartao
    }

    getValidadeCartao = () : number => {
        return this.validadeCartao
    }

    getCodigoSeguranca = () : number => {
        return this.codigoSeguranca
    }
    static toArmazenaPagamentoModel (data: any): ArmazenaPagamentoModel {
        return new ArmazenaPagamentoModel(data.id_pagamento, data.id_cliente,
             data.nomeTitular, data.numeroCartao, data.validadeCartao,data.codigoSeguranca);
    }
}