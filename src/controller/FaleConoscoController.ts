import { Request, Response } from "express";
import { FaleConoscoBusiness } from "../business/FaleConoscoBusiness";
import { FaleConoscoInputDTO } from "../types/FaleConoscoInputDTO";

export class FaleConoscoController {
  constructor(private faleConoscoBusiness: FaleConoscoBusiness) {}

  public createFaleConosco = async (req: Request, res: Response) => {
    try {
      const { avaliacao, nome_usuario, email, mensagem } = req.body;

      const faleConoscoInput: FaleConoscoInputDTO = {
        avaliacao,
        nome_usuario,
        email,
        mensagem,
    
      };
      await this.faleConoscoBusiness.createFaleConosco(faleConoscoInput);
      res.status(201).send({ message: "Created successfully." });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({
        message,
      });
    }
  };

  getFaleConoscoById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const faleConosco = await this.faleConoscoBusiness.getFaleConoscoById(id);
      res.status(200).send({ message: "Contact us form found!", faleConosco });
       
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  getAllFaleConosco = async (req: Request, res: Response) => {
    try {
      const result = await this.faleConoscoBusiness.getAllFaleConosco();
      res.status(200).send({ result });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
}
