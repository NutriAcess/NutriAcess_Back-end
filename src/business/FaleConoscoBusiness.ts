import { FaleConoscoData } from "../data/FaleConoscoData";
import { CustomError } from "../error/CustomError";
import { IdGenerator } from "../services/idGenerator";
import { FaleConoscoInputDTO } from "../types/FaleConoscoInputDTO";

export class FaleConoscoBusiness {
    constructor(
      private idGenerator: IdGenerator,
      private faleConoscoData: FaleConoscoData
    ) {}
    public async create(
        input: FaleConoscoInputDTO
    )  {
        try {
            const {avaliacao, nome_usuario,email,mensagem} = input;
            if (!avaliacao || !nome_usuario || !email || !mensagem) {
                throw new CustomError(422, "Missing input.");
            }
        }   catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }  
      public async getFaleConosco (data: any) {
        try {
            const { id } = data;

            if (!id) {
                throw new CustomError(422, "User name or id required");
            } 
            if ( id ) {
                const result = await this.faleConoscoData.findFaleConoscoById(id);
              return result;
            } else {
                throw new CustomError(422, "User ID or name is required");
            }
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
      };

      public async getAllFaleConosco() {
        try {
            const faleConoscoData = new FaleConoscoData();
            const results = await faleConoscoData.getFaleConosco();
            return results;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
      };
}