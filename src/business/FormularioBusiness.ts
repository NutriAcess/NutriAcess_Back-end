import { ClienteData } from "../data/ClienteData";
import { FormularioData } from "../data/FormularioData";
import { CustomError } from "../error/CustomError";
import { FormularioModel } from "../model/FormularioModel";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { FormularioInputDTO } from "../types/FormularioInputDTO";

export class FormularioBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private tokenGenerator: TokenGenerator,
    private formData: FormularioData,
    private clienteData: ClienteData
  ) {}
  public async createForm(input: FormularioInputDTO) {
    try {
      const {
        token,
        nome,
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
      } = input;
      if (!token) {
        throw new CustomError(403, `Authorization token is required`);
      }
     
     
      const tokenData = this.tokenGenerator.verify(token);
      console.log(tokenData)
      if (!tokenData) {
       
        throw new CustomError(404, `User not found!`);
      }
      
      if (
        !nome ||
        !objetivo ||
        !genero ||
        !altura ||
        !idade ||
        !peso ||
        !capacidade_fisica ||
        !restricao_alimentar ||
        !tempo_preparo ||
        !id_cliente
      ) {
        throw new CustomError(422, "Missing input.");
      }
      if (isNaN(altura) || isNaN(idade) || isNaN(peso)) {
        throw new CustomError(401, "Invalid number!");
      }
      if (
        objetivo.toLowerCase() !== "perder peso" &&
        objetivo.toLowerCase() !== "manter peso" &&
        objetivo.toLowerCase() !== "ganhar massa"
      ) {
        throw new CustomError(
          422,
          "Objetivo accepts  'perder peso', 'manter peso', 'ganhar massa' as a valid result."
        );
      }
      if (
        genero.toLowerCase() !== "homem" &&
        genero.toLowerCase() !== "mulher" &&
        genero.toLowerCase() !== "outro"
      ) {
        throw new CustomError(
          422,
          "Objetivo accepts  'mulher', 'homem', 'outro' as a valid result."
        );
      }
      if (
        capacidade_fisica.toLowerCase() !== "sedentarismo" &&
        capacidade_fisica.toLowerCase() !== "atividade fisica moderada" &&
        capacidade_fisica.toLowerCase() !== "atividade fisica intensa"
      ) {
        throw new CustomError(
          422,
          "Objetivo accepts  'sedentarismo', 'atividade fisica moderada', 'atividade fisica intensa' as a valid result."
        );
      }
      if (
        restricao_alimentar.toLowerCase() !== "qualquer coisa" &&
        restricao_alimentar.toLowerCase() !== "vegetariano" &&
        restricao_alimentar.toLowerCase() !== "vegano"
      ) {
        throw new CustomError(
          422,
          "Objetivo accepts  'qualquer coisa', 'vegetariano', 'vegano' as a valid result."
        );
      }
      if (
        tempo_preparo.toLowerCase() !== "sim" &&
        tempo_preparo.toLowerCase() !== "não"
      ) {
        throw new CustomError(
          422,
          "Objetivo accepts  'sim', 'não' as a valid result."
        );
      }

      const clienteExists = await this.clienteData.findClienteById(id_cliente);
      if (!clienteExists) {
        throw new CustomError(404, `Client could not be found`);
      }

      const id_formulario = this.idGenerator.generate();
      const newForms = new FormularioModel(
        id_formulario,
        nome,
        objetivo,
        genero,
        altura,
        idade,
        peso,
        capacidade_fisica,
        restricao_alimentar,
        tempo_preparo,
        foto,
        id_cliente
      );
      await this.formData.createFormulario(newForms);
      return newForms;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
  
  public async getFormById(id_formulario: string, token: string) {
    try {
      if (!token) {
        throw new CustomError(401, "Insert a token please!")
    }
    if (!id_formulario) {
      throw new CustomError(400,"Insert a id_formulario please!")
  }
  const formTokenData = this.tokenGenerator.verify(token)

  if(!formTokenData){
    throw new CustomError(401, "Invalid token!")
  }

  const form = await this.formData.findFormularioById(id_formulario)

  if(!form){
    throw new CustomError(400,"There is no form with that ID!")
  }
  return form;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  public async getAllFormularios () {
    try {
     
      const results = await this.formData.getFormularios();
      return results;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
