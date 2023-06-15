import { Request, Response } from "express";
import { ClienteBusiness } from "../business/ClienteBusiness";

export class ClienteController {
  constructor(private clienteBusiness: ClienteBusiness) {}
  signup = async (req: Request, res: Response) => {
    try {
      const { nome_completo, nome_social, email, senha } = req.body;
      const result: string = await this.clienteBusiness.signup(
        nome_completo,
        nome_social,
        email,
        senha
      );
      res.status(201).send({ result });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
  login = async (req: Request, res: Response) => {
    try {
      const { email, senha } = req.body;
      const result = await this.clienteBusiness.login(email, senha);

      res.status(201).send({ result });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
  getCliente = async (req: Request, res: Response) => {
    const id_cliente = req.query.id_cliente;
    const nome_completo = req.query.nome_completo;

    const dataId = { id_cliente: id_cliente };
    const dataNome = { nome_completo: nome_completo };

    try {
      if (id_cliente && !nome_completo) {
        const result = await this.clienteBusiness.getCliente(dataId);
        res.status(200).send(result);
      } else if (!id_cliente && nome_completo) {
        const result = await this.clienteBusiness.getCliente(dataNome);
        res.status(200).send(result);
      } else {
        const result = await this.clienteBusiness.getAllClientes();
        res.status(200).send(result);
      }
    } catch (error: any) {
      const { statusCode, message } = error;
      if (statusCode === 200) {
        res.status(500).send(`Unexpected error!`);
      } else {
        res.status(statusCode || 400).send({ message });
      }
    }
  };
  update = async (req: Request, res: Response) => {
    try {
      const { nome_completo, nome_social, email, senha } = req.body;
      const id_cliente = req.params.id; 
      const result: string = await this.clienteBusiness.update(id_cliente, {
        nome_completo,
        nome_social,
        email,
        senha,
      });
      res.status(200).send({ result });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
  
  

}
