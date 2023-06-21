import { Request, Response } from "express";
import { PlanosBusiness } from "../business/PlanosBusiness";
import { PlanosInputDTO } from "../types/PlanosInputDTO";

export class PlanosController {
  constructor(private planosBusiness: PlanosBusiness) {}

  createPlanos = async (req: Request, res: Response) => {
    try {
      const { tipo, duracao, descricao, valor } = req.body;
      const planosInput: PlanosInputDTO = {
        tipo,
        duracao,
        descricao,
        valor,
      };
      const result = await this.planosBusiness.createPlanos(planosInput);
      res.status(201).send({ message: "Created successfully.", result });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  getPlanoById = async (req: Request, res: Response) => {
    try {
      const id_plano = req.params.id_plano;
      const plano = await this.planosBusiness.getPlanoById(id_plano);
      res.status(200).send({ message: "Plan found!", plano });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  getAllPlanos = async (req: Request, res: Response) => {
    try {
      const result = await this.planosBusiness.getAllPlanos();
      res.status(200).send({ result });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
}