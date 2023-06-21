import { ClienteData } from "../data/ClienteData";
import { FaleConoscoData } from "../data/FaleConoscoData";
import { CustomError } from "../error/CustomError";
import { AVALIACAO, FaleConoscoModel } from "../model/FaleConoscoModel";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { FaleConoscoInputDTO } from "../types/FaleConoscoInputDTO";

export class FaleConoscoBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private faleConoscoData: FaleConoscoData
  ) {}
  public async createFaleConosco(input: FaleConoscoInputDTO) {
    try {
      const { avaliacao, nome_usuario, email, mensagem } = input;

      if (!avaliacao || !nome_usuario || !email || !mensagem) {
        throw new CustomError(422, "Missing input.");
      }

      if (!Object.values(AVALIACAO).includes(input.avaliacao)) {
        throw new CustomError(422, "Invalid evaluation.");
      }

      const id = this.idGenerator.generate();
      const newFaleConosco = new FaleConoscoModel(
        id,
        avaliacao,
        nome_usuario,
        email,
        mensagem
      );
      await this.faleConoscoData.createFaleConosco(newFaleConosco);

      return newFaleConosco;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  public async getFaleConoscoById(id: string) {
    try {
      if (!id) {
        throw new CustomError(400, "Insert a id please!");
      }

      const faleConosco = await this.faleConoscoData.findFaleConoscoById(id);

      if (!faleConosco) {
        throw new CustomError(
          400,
          "There is no contact form with this id!There is no query with this id!"
        );
      }
      return faleConosco;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  public async getAllFaleConosco() {
    try {
      const results = await this.faleConoscoData.getFaleConosco();
      return results;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}
