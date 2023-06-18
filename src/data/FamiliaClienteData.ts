import { CustomError } from "../error/CustomError";
import { BaseData } from "./BaseData";
import { FamiliaClienteModel } from "../model/FamiliaClienteModel";

export class FamiliaClienteData extends BaseData{
  protected tableName:string = "familia_cliente"
  public async createFamiliaCliente(familiaCliente: FamiliaClienteModel): Promise<void>{
    try {
      await BaseData.connection(this.tableName).insert({
        id_familia_cliente: familiaCliente.getId_familia_cliente(),
        id_cliente: familiaCliente.getId_cliente(),
        id_familia: familiaCliente.getId_familia()
      })
    }  catch (error:any) {
       throw new CustomError(400, error.sqlMessage);
     }
  }
  public async findFamiliaClientebyId(
    id_familia_cliente: string
  ): Promise<FamiliaClienteModel | undefined> {
      try {
          const [familiaCliente]: FamiliaClienteModel[] = await BaseData.connection(
            this.tableName
          )
              .select("*")
              .where ({ id_familia_cliente: id_familia_cliente });
            return familiaCliente;
         } catch (error: any) {
            throw new CustomError(400,error.sqlMessage);
         }
  }

  public async getFamiliaCliente() {
    try {
    const results = await BaseData.connection(this.tableName).select(
        "*"
    );
    return results;
    } catch (error: any) {
        throw new CustomError(400,error.sqlMessage);
    }
  }
}