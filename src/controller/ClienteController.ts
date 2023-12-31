import { Request, Response } from "express";
import { ClienteBusiness } from "../business/ClienteBusiness";
import { ClienteInputDTO, ClienteInputDTO2 } from "../types/ClienteInputDTO";

export class ClienteController {
  constructor(private clienteBusiness: ClienteBusiness) {}

  signup = async (req: Request, res: Response) => {
    try {
      const { nome_completo, nome_social, email, senha, telefone } = req.body;
      const clienteInput: ClienteInputDTO = {
        nome_completo,
        nome_social,
        email,
        senha,
        telefone
      };
     await this.clienteBusiness.signup(clienteInput);

      res.status(201).send({ message: "Sign Up created successfully." });

    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
  
      const { email, senha } = req.body;

      const { accessToken, user } = await this.clienteBusiness.login(
        email,
        senha
      );

      res
        .status(201)
        .send({ message: "Login successful.", token: accessToken, user });

    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
  

  getClienteById = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const id_cliente = req.params.id_cliente;

      const cliente = await this.clienteBusiness.getClienteById(
        id_cliente,
        token
      );
      res.status(200).send({ message: "Customer found!", cliente });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  getAllClientes = async (req: Request, res: Response) => {
    try {
      const result = await this.clienteBusiness.getAllClientes();
      res.status(200).send({ result });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  
  getClienteAndFormById = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const id_cliente = req.params.id_cliente;
  
      const clienteAndForm = await this.clienteBusiness.getClienteAndFormById(
        id_cliente,
        token
      );
    
      
  
      res.status(200).send({ message: "Cliente and Form found!", clienteAndForm });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
  
  
  
}
