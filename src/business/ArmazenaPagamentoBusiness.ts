import { ca } from "date-fns/locale";
import { ArmazenaPagamentoData } from "../data/ArmazenaPagamentoData";
import { ClienteData } from "../data/ClienteData";
import { CustomError } from "../error/CustomError";
import { ArmazenaPagamentoModel } from "../model/ArmazenaPagamentoModel";
import { IdGenerator } from "../services/idGenerator";
import { ArmazenaPagamentoInputDTO } from "../types/ArmazenaPagamentoInputDTO";
import { format, parse } from "date-fns";

export class ArmazenaPagamentoBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private pagamentoData: ArmazenaPagamentoData,
    private clienteData: ClienteData
  ) {}

  public async createPagamento(input: ArmazenaPagamentoInputDTO) {
    try {
      const {
        id_cliente,
        nomeTitular,
        numeroCartao,
        validadeCartao,
        codigoSeguranca,
      } = input;

      if (
        !id_cliente ||
        !nomeTitular ||
        !numeroCartao ||
        !validadeCartao ||
        !codigoSeguranca
      ) {
        throw new CustomError(422, "Missing input.");
      }
      if (numeroCartao.toString().length !== 16) {
        throw new CustomError(422, "Invalid credit card number.");
      }

      if (codigoSeguranca.toString().length !== 3) {
        throw new CustomError(422, "Invalid card security code.");
      }

      const cardNumberRegex = /^\d{16}$/;
      if (!cardNumberRegex.test(numeroCartao.toString())) {
        throw new CustomError(422, "Invalid credit card number format.");
      }

      const securityCodeRegex = /^\d{3}$/;
      if (!securityCodeRegex.test(codigoSeguranca.toString())) {
        throw new CustomError(422, "Invalid card security code format.");
      }

      const clienteExists = await this.clienteData.findClienteById(id_cliente);
      if (!clienteExists) {
        throw new CustomError(400, "Client could not be found");
      }

      const id_pagamento = this.idGenerator.generate();
      const validadeCartaoDate = parse(validadeCartao, "MM/yy", new Date());
      const formattedValidadeCartao = format(validadeCartaoDate, "MM/yy");

      const newPagamento = new ArmazenaPagamentoModel(
        id_pagamento,
        id_cliente,
        nomeTitular,
        numeroCartao,
        formattedValidadeCartao,
        codigoSeguranca
      );
      await this.pagamentoData.createArmazenaPagamento(newPagamento);
      return newPagamento;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  public async getPagamentoById(id_pagamento: string) {
    try {
      if (!id_pagamento) {
        throw new CustomError(401, "Insert an id_pagamento, please!");
      }

      const pagamento = await this.pagamentoData.findPagamentoById(
        id_pagamento
      );

      if (!pagamento) {
        throw new CustomError(400, "There is no form with that ID");
      }

      return pagamento;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}
