import { threadId } from "worker_threads";
import { FamiliaData } from "../data/FamiliaData";
import { CustomError } from "../error/CustomError";
import { IdGenerator } from "../services/idGenerator";
import { FamiliaInputDTO } from "../types/FamiliaInputDTO";
import { ClienteData } from "../data/ClienteData";
import { TokenGenerator } from "../services/tokenGenerator";
import { PlanosData } from "../data/PlanosData";
import { FamiliaModel } from "../model/FamiliaModel";

export class FamiliaBusiness {
  constructor(
    private tokenGenerator: TokenGenerator,
    private clienteData: ClienteData,
    private idGenerator: IdGenerator,
    private familiaData: FamiliaData,
    private planoData: PlanosData
  ) {}
  public async createFamilia(input: FamiliaInputDTO) {
    try {
      const { token, nome, idade, sexo, peso, id_plano, id_cliente } = input;

      if (!token) {
        throw new CustomError(401, `Authorization token is required`);
      }

      const tokenData = this.tokenGenerator.verify(token);

      if (!tokenData) {
        throw new CustomError(401, "Invalid token!");
      }
      if (!nome || !idade || !sexo || !peso || !id_plano || !id_cliente) {
        throw new CustomError(422, "Missing input");
      }

      if (isNaN(idade) || isNaN(peso)) {
        throw new CustomError(401, "Invalid number!");
      }
      if (
        sexo.toLowerCase() !== "masculino" &&
        sexo.toLowerCase() !== "feminino" &&
        sexo.toLowerCase() !== "outro"
      ) {
        throw new CustomError(
          422,
          "Gender accepts  ' masculino', ' feminino', 'outro' as a valid result."
        );
      }
      const clienteExists = await this.clienteData.findClienteById(id_cliente);
      const planoExists = await this.planoData.findPlanosById(id_plano);
      if (!clienteExists) {
        throw new CustomError(404, `Client could not be found!`);
      }
      if (!planoExists) {
        throw new CustomError(404, `Could not find the plan!`);
      }
      const id_familia = this.idGenerator.generate();
      const newFamilia = new FamiliaModel(
        id_familia,
        nome,
        idade,
        sexo,
        peso,
        id_cliente,
        id_plano
      );
      await this.familiaData.createFamilia(newFamilia);
      return newFamilia;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
  public async getFamiliaById(id_familia: string, token: string) {
    try {
      if (!token) {
        throw new CustomError(401, "Insert a token please!");
      }
      if (!id_familia) {
        throw new CustomError(400, "Insert a id_familia please!");
      }
      const familiaTokenData = this.tokenGenerator.verify(token);

      if (!familiaTokenData) {
        throw new CustomError(401, "Invalid token!");
      }

      const famila = await this.familiaData.findFamiliaById(id_familia);

      if (!famila) {
        throw new CustomError(400, "There is no family with that ID!");
      }
      return famila;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  public async getAllFamilias() {
    try {
      const results = await this.familiaData.getFamilia();
      return results;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}
