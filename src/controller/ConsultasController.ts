import { Request, Response } from "express";
import { ConsultasBusiness } from "../business/ConsultasBusiness"
import { ConsultasInputDTO } from "../types/ConsultasInputDTO";

export class ConsultasController {
    constructor(private consultasBusines: ConsultasBusiness) {}

    createConsultas = async (req: Request, res: Response) => {
        try {
            const { data, hora, status, observacoes, id_nutricionista, id_cliente } = req.body;
            const formattedData = new Date(data);
            const formattedHora = new Date(hora);
            const input: ConsultasInputDTO = {
                data: formattedData,
                hora: formattedHora, 
                status, 
                observacoes,
                id_nutricionista, 
                id_cliente
            }
            const result = await this.consultasBusines.createConsultas(input)

            res.status(201).send({message: "Consulta marcada!", result});
        } catch (error: any) {
            const { statusCode, message } = error;
            res.status(statusCode || 400).send({ message });
        }
    }
}