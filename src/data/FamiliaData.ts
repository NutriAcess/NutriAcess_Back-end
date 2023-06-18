import { CustomError } from "../error/CustomError";
import { FamiliaModel } from "../model/FamiliaModel";
import { BaseData } from "./BaseData";

export class FamiliaData extends BaseData {
  protected tableName: string = "familia";

  public async createFamilia(familia: FamiliaModel): Promise<void> {
    try {
      await BaseData.connection(this.tableName).insert({
        id_familia: familia.getId_familia(),
        nome: familia.getNome(),
        idade: familia.getIdade(),
        sexo: familia.getSexo(),
        peso: familia.getPeso(),
        id_cliente: familia.getId_cliente(),
        id_plano: familia.getId_plano(),
      });
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }
  public async findFamiliaById(
    id_familia: string
  ): Promise<FamiliaModel | undefined> {
    try {
      const [familia]: FamiliaModel[] = await BaseData.connection(
        this.tableName
      )
        .select("*")
        .where({ id_familia: id_familia });
      return familia;
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }

  public async getFamilia() {
    try {
      const results = await BaseData.connection(this.tableName).select("*");
      return results;
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }
}
