import { Request, Response } from "express";
import { ArmazenaPagamentoBusiness } from "../business/ArmazenaPagamentoBusiness";
import { ArmazenaPagamentoInputDTO } from "../types/ArmazenaPagamentoInputDTO";

export class ArmazenaPagamentoController {
  constructor(private armazenaPagamentoBusiness: ArmazenaPagamentoBusiness) {}

  createPagamento = async (req: Request, res: Response) => {
    try {
      const { id_cliente, nomeTitular, numeroCartao, codigoSeguranca, validadeCartao } = req.body;

      const pagamento: ArmazenaPagamentoInputDTO = {
        id_cliente,
        nomeTitular,
        numeroCartao,
        codigoSeguranca,
        validadeCartao
      };
      const newPagamento = await this.armazenaPagamentoBusiness.createPagamento(pagamento);

      res.status(201).send({ message: "Form created successfully.", newPagamento });
    } catch (error: any) {
      if (res.statusCode === 200) {
        res.status(500).send({ message: error.message });
      } else {
        res.status(res.statusCode).send({ message: error.sqlMessage || error.message });
      }
    }
  };

  getPagamentoById = async (req: Request, res: Response) => {
    try {
      const id_pagamento = req.params.id_pagamento;

      const pagamento = await this.armazenaPagamentoBusiness.getPagamentoById(id_pagamento);

      res.status(200).send({ message: "Pagamento encontrado.", pagamento });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
}