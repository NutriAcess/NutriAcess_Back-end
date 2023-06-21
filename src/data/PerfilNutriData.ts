import { CustomError } from "../error/CustomError";
import { PerfilNutriModel } from "../model/PerfilNutriModel";
import { BaseData } from "./BaseData";

export class PlanosData extends BaseData {
  protected tableName: string = "perfil_nutri";

  public async createPerfilNutri(perfil: PerfilNutriModel): Promise<void> {
    try {
      await BaseData.connection(this.tableName).insert({
        id_perfil: perfil.getIdPerfil(),
        nome: perfil.getNome(),
        foto:perfil.getFoto(),
        instagram: perfil.getInstagram(),
        bio:perfil.getBio(),
        especialidade:perfil.getEspecialidades()
      });
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }
  // public async findPlanosById(
  //   id_plano: string
  // ): Promise<PlanosModel | undefined> {
  //   try {
  //     const [plano]: PlanosModel[] = await BaseData.connection(this.tableName)
  //       .select("*")
  //       .where({ id_plano: id_plano });
  //     return plano;
  //   } catch (error: any) {
  //     throw new CustomError(400, error.sqlMessage);
  //   }
  // }
  // public async getPlanos() {
  //   try {
  //     const results = await BaseData.connection(this.tableName).select("*");
  //     return results;
  //   } catch (error: any) {
  //     throw new CustomError(400, error.sqlMessage);
  //   }
  // }
}
