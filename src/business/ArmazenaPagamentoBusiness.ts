import { ca } from "date-fns/locale";
import { ArmazenaPagamentoData } from "../data/ArmazenaPagamentoData";
import { ClienteData } from "../data/ClienteData";
import { CustomError } from "../error/CustomError";
import { ArmazenaPagamentoModel } from "../model/ArmazenaPagamentoModel";
import { IdGenerator } from "../services/idGenerator";
import { ArmazenaPagamentoInputDTO } from "../types/ArmazenaPagamentoInputDTO";


export class ArmazenaPagamentoBusiness {
    constructor(
    private idGenerator: IdGenerator,
    private pagamentoData: ArmazenaPagamentoData,
    private clienteData: ClienteData
    ){}
    public async createPagamento(input: ArmazenaPagamentoInputDTO) {
        try {
            const {
                id_cliente,
                nomeTitular,
                numeroCartao,
                validadeCartao,
                codigoSeguranca
            } = input;

            if (
                id_cliente ||
                !nomeTitular ||
                !numeroCartao || 
                !validadeCartao ||
                !codigoSeguranca 
            )  {
                throw new CustomError(422, "Missing input.")
        }
        if (isNaN(numeroCartao) || isNaN(validadeCartao) || isNaN(codigoSeguranca)) {
            throw new CustomError(401, "Invalid Number!");
        }

        const clienteExists = await this.clienteData.findClienteById(id_cliente);
        if (!clienteExists) {
            throw new CustomError(400, "Client could not be found");
        }

        const id_pagamento = this.idGenerator.generate();
        const newPagamento = new ArmazenaPagamentoModel (
            id_pagamento,
            id_cliente,
            nomeTitular,
            numeroCartao,
            codigoSeguranca,
            validadeCartao
        );
        await this.pagamentoData.createArmazenaPagamento(newPagamento);
        return newPagamento
    } catch (error: any) {
        throw new CustomError(error.statusCode, error.message);
    }
}

    public async getPagamentoById(id_pagamento: string) {
        try {
            if (!id_pagamento) {
                throw new CustomError(401, "Insert a id_pagamento please!")
            }

            const pagamento = await this.pagamentoData.findPagamentoById(id_pagamento)

            if(!pagamento){
                throw new CustomError(400, "There is no form with that ID")
            }

            return pagamento;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    };
}
