import { Request, Response } from "express";
import { NutricionistaBusiness } from "../business/NutricionistaBusiness";

export class NutricionistaController {
  constructor(private nutriBusiness: NutricionistaBusiness) {}
  signup = async (req: Request, res: Response) => {
    try {
      const { nome_completo, nome_social, email, senha, crn } = req.body;
      const result: string = await this.nutriBusiness.signup(
        nome_completo,
        nome_social,
        email,
        senha,
        crn
      );
      res.status(201).send({ result });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
  login = async (req: Request, res: Response) => {
    try {
      const { senha, crn } = req.body;
      const result = await this.nutriBusiness.login(crn, senha);

      res.status(201).send({ result });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  getNutricionista = async (req: Request, res: Response) => {
    const id_nutricionista = req.query.id_nutricionista;
    const nome_completo = req.query.nome_completo;

    const dataId = { id_nutricionista: id_nutricionista };
    const dataNome = { nome_completo: nome_completo };

    try {
      if (id_nutricionista && !nome_completo) {
        const result = await this.nutriBusiness.getNutricionista(dataId);
        res.status(200).send(result);
      } else if (!id_nutricionista && nome_completo) {
        const result = await this.nutriBusiness.getNutricionista(dataNome);
        res.status(200).send(result);
      } else {
        const result = await this.nutriBusiness.getAllNutricionistas();
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
}
