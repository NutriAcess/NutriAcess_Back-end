// import { CustomError } from "../error/CustomError";
// import { BaseData } from "./BaseData";

// export class ConsultasData extends BaseData{
//   protected tableName:string = "consultas"
//   public async createConsulta(consulta: ): Promise<void>{
//     try {
//       await BaseData.connection(this.tableName).insert({
        
//       })
      
//     }catch (error:any) {
//       throw new CustomError(400, error.sqlMessage);

//   }
//   }
// }