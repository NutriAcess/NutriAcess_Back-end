import { Request, Response } from "express";
import { FormularioBusiness } from "../business/FormularioBusiness";

export class FormularioController {
  constructor(private formularioBusiness: FormularioBusiness) {}
  create = async (req: Request, res: Response) => {
    try {
      // const { nome, objetivo, altura, idade, peso, capacidade_fisica, restricao_alimentar, tempo_preparo, foto } = req.body;
      // const id_formulario = req.params.id; 
      // const result: FormularioInputDTO = await this.formularioBusiness.create(
      //   nome, objetivo, altura, idade, peso, capacidade_fisica, restricao_alimentar, tempo_preparo, foto, id_formulario
      // );
      res.status(201).send();
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
}
  
  getCliente = async (req: Request, res: Response) => {
    const id_cliente = req.query.id_cliente;
    // const nome_completo = req.query.nome_completo;

    const dataId = { id_cliente: id_cliente };
    // const dataNome = { nome_completo: nome_completo };

    try {
      if (id_cliente ) {
        const result = await this.clienteBusiness.getCliente(dataId);
        res.status(200).send(result);
      } else {
        const result = await this.clienteBusiness.getAllClientes();
        res.status(200).send(result);
      }
      // if (id_cliente && !nome_completo) {
      //   const result = await this.clienteBusiness.getCliente(dataId);
      //   res.status(200).send(result);
      // } else if (!id_cliente && nome_completo) {
      //   const result = await this.clienteBusiness.getCliente(dataNome);
      //   res.status(200).send(result);
      // } else {
      //   const result = await this.clienteBusiness.getAllClientes();
      //   res.status(200).send(result);
      // }
    } catch (error: any) {
      const { statusCode, message } = error;
      if (statusCode === 200) {
        res.status(500).send(`Unexpected error!`);
      } else {
        res.status(statusCode || 400).send({ message });
      }
    }
  };
  // update = async (req: Request, res: Response) => {
  //   try {
  //     const { id_cliente, nome_completo, nome_social, email, senha } = req.body;
  //     const result: string = await this.clienteBusiness.update(id_cliente, {
  //       nome_completo,
  //       nome_social,
  //       email,
  //       senha,
  //     });
  //     res.status(200).send({ result });
  //   } catch (error: any) {
  //     const { statusCode, message } = error;
  //     res.status(statusCode || 400).send({ message });
  //   }
  // };
  
  

