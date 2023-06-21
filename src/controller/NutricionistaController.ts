import { Request, Response } from "express";
import { NutricionistaBusiness } from "../business/NutricionistaBusiness";
import { NutriInputDTO, NutriInputDTO2 } from "../types/NutriInputDTO";

export class NutricionistaController {
  constructor(private nutriBusiness: NutricionistaBusiness) {}
  signup = async (req: Request, res: Response) => {
    try {
      const { nome_completo, nome_social, email, senha, crn } = req.body;
      const nutriInput: NutriInputDTO = {
        nome_completo,
        nome_social,
        email,
        senha,
        crn
      }
    await this.nutriBusiness.signup(nutriInput);
    
      res.status(201).send({ message:"Sign Up created successfully." });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
  login = async (req: Request, res: Response) => {
    try {
   
      const { senha, crn } = req.body;
      const result = await this.nutriBusiness.login(crn, senha);
  
      res.status(201).send({ message: 'Login successful.', token: result.accessToken });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
  
 
  getNutriById = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string
      const id_nutricionista = req.params.id_nutricionista;
     
      const nutri = await this.nutriBusiness.getNutriById(id_nutricionista, token)
      res.status(200).send({message: "Found nutritionist!", nutri })
  
       
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
  // getNutriByEspecialidade = async (req: Request, res: Response) => {
  //   try {
  //     const { especialidade } = req.body;
  //     const nutriInput: NutriInputDTO2 = {
  //       especialidade
  //     };
  
  //     const nutricionistas = await this.nutriBusiness.getNutriByEspecialidade(nutriInput);
  
  //     res.status(200).send({ nutricionistas });
  //   } catch (error: any) {
  //     const { statusCode, message } = error;
  //     res.status(statusCode || 400).send({ message });
  //   }
  // };
  
  
  getAllNutricionistas = async (req: Request, res: Response) => {
    try {
      const result = await this.nutriBusiness.getAllNutricionistas();
      res.status(200).send({ result });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
}
