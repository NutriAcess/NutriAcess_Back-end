import { CustomError } from "../error/CustomError";
import { NutricionistaModel, SpecialtyNutriEnum } from "../model/NutricionistaModel";
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
        telefone: nutri.getTelefone(),
        especialidade: nutri.getEspecialidade()
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
  public async findNutricionistasByNome(
    nome_completo?: string,
    especialidade?: SpecialtyNutriEnum
  ): Promise<NutricionistaModel[]> {
    try {
      let query = BaseData.connection(this.tableName)
        .select("id_nutricionista", "nome_completo", "email", "especialidade");
  
      if (nome_completo) {
        query = query.where({ nome_completo });
      }
  
      if (especialidade) {
        if (!Object.values(SpecialtyNutriEnum).includes(especialidade)) {
          throw new CustomError(
            422,
            "Invalid specialty. Must be one of the following: 'Nutrição Esportiva', 'Nutrição Funcional', 'Nutrição Estética', 'Nutrição Integrativa', 'Materno-Infanti', or 'Nutrição Familiar'."
          );
        }
  
        query = query.where({ especialidade });
      }
  
      const nutricionistas = await query;
  
      return nutricionistas.map((nutri) =>
        NutricionistaModel.toNutricionistaModel(nutri)
      );
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
