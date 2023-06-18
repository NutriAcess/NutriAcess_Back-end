import { CustomError } from "../error/CustomError";
import { NutricionistaModel } from "../model/NutricionistaModel";
import { BaseData } from "./BaseData";

export class NutricionistaData extends BaseData {
  protected tableName: string = "nutricionista";

  public async createNutricionista(nutri: NutricionistaModel): Promise<void> {
    try {
      await BaseData.connection(this.tableName).insert({
        id_nutricionista: nutri.getIdNutricionista(),
        nome_completo: nutri.getNomeCompleto(),
        nome_social: nutri.getNomeSocial(),
        email: nutri.getEmail(),
        senha: nutri.getSenha(),
        crn: nutri.getCrn(),
      });
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }
  public async findNutricionistaByEmail(
    email: string
  ): Promise<NutricionistaModel | undefined> {
    try {
      const nutri = await BaseData.connection(this.tableName)
        .select("*")
        .where({ email: email });
      return nutri[0] && NutricionistaModel.toNutricionistaModel(nutri[0]);
    } catch (error: any) {
      console.log(error);
      throw new CustomError(400, error.sqlMessage);
    }
  }
  public async findNutricionistaByCrn(
    crn: string
  ): Promise<NutricionistaModel | undefined> {
    try {
      const nutri = await BaseData.connection(this.tableName)
        .select("*")
        .where({ crn: crn });
      return nutri[0] && NutricionistaModel.toNutricionistaModel(nutri[0]);
    } catch (error: any) {
      console.log(error);
      throw new CustomError(400, error.sqlMessage);
    }
  }
  public async findNutricionistaById(
    id_nutricionista: string
  ): Promise<NutricionistaModel | undefined> {
    try {
      const [nutri]: NutricionistaModel[] = await BaseData.connection(
        this.tableName
      )
        .select("*")
        .where({ id_nutricionista: id_nutricionista });
      return nutri;
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }
  public async findNutricionistaByNome(
    nome_completo: string
  ): Promise<NutricionistaModel | undefined> {
    try {
      const nutri = await BaseData.connection(this.tableName)
        .select("*")
        .where({ nome_completo: nome_completo });
      return nutri[0];
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }
  public async getNutricionistas() {
    try {
      const results = await BaseData.connection(this.tableName).select(
        "*"
      );
      return results;
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }
}
