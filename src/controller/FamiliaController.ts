import { Request, Response } from "express";
import { FamiliaBusiness } from "../business/FamiliaBusiness";
import { FamiliaInputDTO } from "../types/FamiliaInputDTO";

export class FamiliaController {
  constructor(private familiaBusiness: FamiliaBusiness) {}

  createFamilia = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string
      
      const { nome, idade, sexo, peso, id_plano,  id_cliente } = req.body;

      const familia: FamiliaInputDTO ={token, nome, idade, sexo, peso, id_plano,  id_cliente }

      const newFamilia = await this.familiaBusiness.createFamilia(familia);
 
      res.status(201).send({message:"Created successfully.", newFamilia });
    } catch (error: any) {
      if (res.statusCode === 200) {
          res.status(500).send({ message: error.message })
      } else {
          res.status(res.statusCode).send({ message: error.sqlMessage || error.message })
      }
  }
  };
  getFamiliaById = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string
      const id_familia = req.params.id_familia;
     
      const familia = await this.familiaBusiness.getFamiliaById(id_familia, token)
      res.status(200).send({message: "Family plan found!", familia })
  
       
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  getAllFamilias = async (req: Request, res: Response) => {
    try {
      const result = await this.familiaBusiness.getAllFamilias();
      res.status(200).send({ result });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
}
