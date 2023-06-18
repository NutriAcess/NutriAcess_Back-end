import { CustomError } from "../error/CustomError";
import { BaseData } from "./BaseData";
import { ConsultasModel } from "../model/ConsultasModel";
import { promises } from "dns";

export class ConsultasData extends BaseData{
  protected tableName:string = "consultas"
  public async createConsultas(consulta: ConsultasModel): Promise<void>{
    try {
      await BaseData.connection(this.tableName).insert({
        id: consulta.getId(),
        data: consulta.getData(),
        hora: consulta.getHora(),
        status: consulta.getStatus(),
        id_nutricionista: consulta.getId_nutricionista(),
        id_cliente: consulta.getId_cliente()
      })
    }  catch (error:any) {
      throw new CustomError(400, error.sqlMessage);

  }
 }
 public async findConsultasById(
    id: string
  ): Promise<ConsultasModel | undefined>{
    try {
        const [consulta]: ConsultasModel[] = await BaseData.connection(this.tableName)

            .select("*")
            .where({ id: id });
        return consulta;
    }   catch (error:any) {
        throw new CustomError(400,error.sqlMessage);
    }
  }

  public async getConsultas() {
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