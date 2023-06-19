import { PlanosData } from "../data/PlanosData";
import { CustomError } from "../error/CustomError";
import { PlanosModel } from "../model/PlanosModel";
import { IdGenerator } from "../services/idGenerator";
import { PlanosInputDTO } from "../types/PlanosInputDTO";

export class PlanosBusiness {
constructor(
    private idGenerator: IdGenerator,
    private planosData: PlanosData
){}
public async createPlanos(
    input: PlanosInputDTO
)   {
    try {
        const {tipo, duracao,descricao,valor} = input;
        if (!tipo || !duracao || !descricao || !valor) {
            throw new CustomError(422, "Missing input")
        } 
        if (isNaN(valor)) {
            throw new CustomError(401, "Invalid number!");
        }

        if (
            tipo.toLowerCase() !== "familia" &&
            tipo.toLowerCase() !== "plus"   &&
            tipo.toLowerCase() !==  "premium" 
          ) {
            throw new CustomError(
              422,
              "O tipo aceita 'plus', 'premium', 'familia' como resultado válido."
            );
          }

        const id = this.idGenerator.generate();
        const newPlano = new PlanosModel (
            id,
            tipo,
            duracao,
            descricao,
            valor
        )

    }   catch (error: any) {
        throw new CustomError(error.statusCode, error.message)
    }
}
    public async getPlanos (data: any) {
        try {
            const {id_plano} = data;
            if (!id_plano) {
                throw new CustomError(422, "User name or id required");
            }
            if (id_plano) {
                const result = await this.planosData.findPlanosById(id_plano);
                return result;
            }   else {
                throw new CustomError(422, "User name or ID required");
            }
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
    }
    };

    public async getAllPlanos() {
    try {
        const planosData = new PlanosData();
        const results = await planosData.getPlanos();
        return results;
     }   catch (error: any) {
        throw new CustomError(error.statusCode, error.message);
     }
   };
}
