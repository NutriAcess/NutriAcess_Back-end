import { CustomError } from "../error/CustomError";
import { BaseData } from "./BaseData";
import { ArmazenaPagamentoModel } from "../model/ArmazenaPagamentoModel";

export class ArmazenaPagamentoData extends BaseData {
    protected tableName: string = "ArmazenaPagamento";

    public async createArmazenaPagamento(pagamento: ArmazenaPagamentoModel): Promise<void> {
        try {
            await BaseData.connection(this.tableName).insert({
                id_pagamento: pagamento.getId_pagamento,
                id_cliente: pagamento.getId_cliente,
                nomeTitular: pagamento.getNomeTitular,
                numeroCartao: pagamento.getNumeroCartao,
                validadeCartao: pagamento.getValidadeCartao,
                codigoSeguranca: pagamento.getValidadeCartao
            });
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage);
        }
    }

    public async findPagamentoById(
        id_pagamento: string
    ):Promise<ArmazenaPagamentoModel| undefined> {
        try {
            const [pagamento]: ArmazenaPagamentoModel[] = await BaseData.connection(
                this.tableName
            )
                .select("*")
                .where({ id_pagamento });

            return pagamento;
        }   catch (error: any) {
            throw new CustomError(400, error.sqlMessage);
        }
    }

    public async getPagamento() {
        try {
            const results = await BaseData.connection(this.tableName).select("*");
            return results;
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage);
        }
    }
}