import {Request, Response } from "express";
import { ConsultasBusiness } from "../business/ConsultasBusiness";
import { FaleConoscoInputDTO } from "../types/FaleConoscoInputDTO";

export class FaleConoscoController {
    constructor(private faleConoscoBusiness: 
    ConsultasBusiness) {}

    public createFaleConosco = async (req: Request, res: Response) => 
    {
        try {
            const {avaliacao,nome_usuario,email,mensagem,id_cliente } = req.body;
            const id = req.params.id;
              res.status(201).send();
        }  catch (error: any)  {
            const { statusCode, message } = error;
            res.status(statusCode | 400).send({
                message });
        }
    }
}