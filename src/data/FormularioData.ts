// import { CustomError } from "../error/CustomError";
// import { BaseData } from "./BaseData";

// export class FormularioData extends BaseData{
//   protected tableName:string = "formulario"
//   public async createFormulario(formulario: ): Promise<void>{
//     try {
//       await BaseData.connection(this.tableName).insert({
        
//       })
      
//     }catch (error:any) {
//       throw new CustomError(400, error.sqlMessage);

//   }
//   }
// }