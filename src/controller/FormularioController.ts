import { Request, Response } from "express";
import { FormularioBusiness } from "../business/FormularioBusiness";

export class FormularioController {
  constructor(private formularioBusiness: FormularioBusiness) {}

  create = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string
      const { nome, objetivo, genero, altura, idade, peso, capacidade_fisica, restricao_alimentar, tempo_preparo, foto,  id_cliente } = req.body;
      
      const data = {
        token,
        nome,
        objetivo,
        genero,
        altura,
        idade,
        peso,
        capacidade_fisica,
        restricao_alimentar,
        tempo_preparo,
        foto,
        id_cliente
      };

      const result = await this.formularioBusiness.create(data);
      res.status(201).send({ result });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
}
