import { threadId } from "worker_threads";
import { FamiliaData } from "../data/FamiliaData";
import { CustomError } from "../error/CustomError";
import { IdGenerator } from "../services/idGenerator";
import { FamiliaInputDTO } from "../types/FamiliaInputDTO";

export class FamiliaBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private familiaData: FamiliaData
    ){}
    public async create(
        input: FamiliaInputDTO
    )   { 
        try {
            const {nome,idade,sexo,peso} = input;
            if (!nome || !idade || !sexo || !peso) {
                throw new CustomError(422, "Missing input")
            }
        }   catch (error: any) {
            throw new CustomError(error.statusCode, error.mensagem)
        }
     }
        public async getFamilia (data: any) {
            try {
                const { id } = data;

                if (!id) {
                    throw new CustomError(422, "User name or id required");
                }
                if ( id ) {
                    const result = await this.familiaData.findFamiliaById(id);
                    return result;
                }   else {
                    throw new CustomError(422, "User ID or name is required");
                }
            }   catch (error: any) {
                throw new CustomError(error.statusCode, error.message);
            }
        };

        public async getAllFamilia() {
            try {
                const familiaData = new FamiliaData();
                const results = await familiaData.getFamilia();
                return results;
            }   catch (error: any) {
                throw new CustomError(error.statusCode, error.message);
            }
        };
}