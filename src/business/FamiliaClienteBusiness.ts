import { FamiliaClienteData } from "../data/FamiliaClienteData";
import { CustomError } from "../error/CustomError";
import { IdGenerator } from "../services/idGenerator";
import { FamiliaClienteInputDTO } from "../types/FamiliaClienteInputDTO";

export class FamiliaClienteBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private familiaClienteData: FamiliaClienteData
    ){}
    public async create(
        input: FamiliaClienteInputDTO
    )  {
        try {
            const {id_cliente, id_familia} = input;
            if (!id_cliente || !id_familia) {
                throw new CustomError(422, "Missing input.");
            }
        }   catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }  
      public async getFamiliaCliente (data: any) {
        try {
            const { id_familia_cliente} = data;

            if (!id_familia_cliente) {
                throw new CustomError(422, "User name or ID is required");
            }
            if ( id_familia_cliente ) {
                const result = await this.familiaClienteData.findFamiliaClientebyId(id_familia_cliente);
                return result;
            }   else {
                throw new CustomError(422, "User ID or name is required");
            }
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
      };
}
