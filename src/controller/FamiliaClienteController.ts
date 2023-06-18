import { Request, Response } from "express";
import { FamiliaClienteBusiness } from "../business/FamiliaClienteBusiness";
import { FamiliaClienteInputDTO } from "../types/FamiliaClienteInputDTO";


export class FamiliaClienteController {
  constructor(private familiaClienteBusiness: FamiliaClienteBusiness) {}

  createFamiliaCliente = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string

      const {  id_familia,  id_cliente } = req.body;

      const familia: FamiliaClienteInputDTO ={token, id_familia,  id_cliente  }

      const newFamilia = await this.familiaClienteBusiness.createFamiliaCliente(familia);
 
      res.status(201).send({message:"Created successfully.", newFamilia });
    } catch (error: any) {
      if (res.statusCode === 200) {
          res.status(500).send({ message: error.message })
      } else {
          res.status(res.statusCode).send({ message: error.sqlMessage || error.message })
      }
  }
  };
  getFamiliaClienteById = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string
      const id_familia_cliente = req.params.id_familia_cliente;
     
      const familia = await this.familiaClienteBusiness.getFamiliaClienteById(id_familia_cliente, token)
      res.status(200).send({message: "Family plan found!", familia })
  
       
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  getAllFamilias = async (req: Request, res: Response) => {
    try {
      const result = await this.familiaClienteBusiness.getAllFamilias();
      res.status(200).send({ result });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
}
