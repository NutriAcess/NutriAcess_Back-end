import { CustomError } from "../error/CustomError";
import { BaseData } from "./BaseData";
import { FaleConoscoModel } from "../model/FaleConoscoModel";

export class FaleConoscoData extends BaseData{
  protected tableName:string = "fale_conosco"
  
  public async createFaleConosco(faleConosco: FaleConoscoModel): Promise<void>{
    try {
      await BaseData.connection(this.tableName).insert({
        id: faleConosco.getId(),
        avaliacao: faleConosco.getAvaliacao(),
        nome_usuario: faleConosco.getNome_usuario(),
        email: faleConosco.getEmail(),
        mensagem: faleConosco.getMensagem(),
        id_cliente: faleConosco.getId_cliente()
      })
      
    }   catch (error:any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }
  
  public async findFaleConoscoById(
    id: string
  ): Promise<FaleConoscoModel | undefined> {
    try {
        const [faleConosco]: FaleConoscoModel[] = await BaseData.connection(
            this.tableName
        )
            
            .select("*")
            .where({ id: id });
        return faleConosco;
    }  catch (error: any) {
        throw new CustomError(400,error.sqlMessage);
    }
  }

    public async getFaleConosco() {
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