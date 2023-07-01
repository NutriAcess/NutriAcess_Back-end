import { Request, Response } from "express";
import { FormularioBusiness } from "../business/FormularioBusiness";
import { FormularioInputDTO } from "../types/FormularioInputDTO";


export class FormularioController {
  constructor(private formularioBusiness: FormularioBusiness) {}

  createForm = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;

      const {
        alergia,
        objetivo,
        genero,
        altura,
        idade,
        peso,
        capacidade_fisica,
        restricao_alimentar,
        tempo_preparo,
        foto,
        id_cliente,
        plano
      } = req.body;

      const form: FormularioInputDTO = {
        token,
        alergia,
        objetivo,
        genero,
        altura,
        idade,
        peso,
        capacidade_fisica,
        restricao_alimentar,
        tempo_preparo,
        foto,
        id_cliente,
        plano
      };
console.log("2", form);

      const newForm = await this.formularioBusiness.createForm(form);
      console.log("3",newForm);
      res.status(201).send({ message: "Form created successfully.", newForm });
    } catch (error: any) {
      if (res.statusCode === 200) {
        res.status(500).send({ message: error.message });
      } else {
        res
          .status(res.statusCode)
          .send({ message: error.sqlMessage || error.message });
      }
    }
  };
  getFormById = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string
      const id_formulario = req.params.id_formulario;
     
      const form = await this.formularioBusiness.getFormById(id_formulario, token)
      res.status(200).send({message: "Form found!", form })
  
       
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  getAllFormularios = async (req: Request, res: Response) => {
    try {
      const result = await this.formularioBusiness.getAllFormularios();
      res.status(200).send({ result });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  updatePlano = async (req: Request, res: Response) => {
    try {
      const { id_formulario } = req.params;
      const { plano } = req.body;
const token = req.headers.authorization as string
     
      const updatedForm = await this.formularioBusiness.updatePlano(id_formulario, plano,token);
      res.status(200).send({ message: "Form's plano updated successfully.", updatedForm });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ message: error.message });
    }
  };
  
}
