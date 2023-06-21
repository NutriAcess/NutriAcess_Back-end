import { PlanosData } from "../data/PlanosData";
import { CustomError } from "../error/CustomError";
import { PlanosModel } from "../model/PlanosModel";
import { IdGenerator } from "../services/idGenerator";
import { PlanosInputDTO } from "../types/PlanosInputDTO";

export class PlanosBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private planosData: PlanosData
  ) {}

  public async createPlanos(input: PlanosInputDTO) {
    try {
      const { tipo, duracao, descricao, valor } = input;

      if (!tipo || !duracao || !descricao || !valor) {

        throw new CustomError(422, "Missing input");
      }
      if (isNaN(valor)) {
        throw new CustomError(401, "Invalid number!");
      }
      if (
        tipo.toLowerCase() !== "familia" &&
        tipo.toLowerCase() !== "plus" &&
        tipo.toLowerCase() !== "premium"
      ) {
        throw new CustomError(
          422,
          "The type accepts 'plus', 'premium', 'familia' as a valid result."
        );
      }

      const id = this.idGenerator.generate();

      const newPlano = new PlanosModel(id, tipo, duracao, descricao, valor);

      await this.planosData.createPlanos(newPlano);

      return newPlano;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  public async getPlanoById(id_plano: string) {
    try {
      if (!id_plano) {
        throw new CustomError(400, "Insert an id_plano, please!");
      }

      const plano = await this.planosData.findPlanosById(id_plano);

      if (!plano) {
        throw new CustomError(400, "There is no plan with that ID!");
      }

      return plano;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  public async getAllPlanos() {
    try {
      const results = await this.planosData.getPlanos();
      return results;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}