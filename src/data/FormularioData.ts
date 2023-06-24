import { CustomError } from "../error/CustomError";
import { BaseData } from "./BaseData";
import { FormularioModel } from "../model/FormularioModel";

export class FormularioData extends BaseData {
  protected tableName: string = "formulario";

  public async createFormulario(forms: FormularioModel): Promise<void> {
    try {
      await BaseData.connection(this.tableName).insert({
        id_formulario: forms.getId_formulaio(),
        objetivo: forms.getObjetivo(),
        altura: forms.getAltura(),
        idade: forms.getIdade(),
        peso: forms.getPeso(),
        capacidade_fisica: forms.getCapacidade_fisica(),
        restricao_alimentar: forms.getRestricao_alimentar(),
        tempo_preparo: forms.getTempo_preparo(),
        foto: forms.getFoto(),
        id_cliente: forms.getId_cliente(),
        alergia: forms.getAlergia()
      });
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }

  public async findFormularioById(
    id_formulario: string
  ): Promise<FormularioModel | undefined> {
    try {
      const [forms]: FormularioModel[] = await BaseData.connection(
        this.tableName
      )
        .select("*")
        .where({ id_formulario: id_formulario });
      return forms;
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }

  public async findFormularioByUserId(
    id_cliente: string
  ): Promise<FormularioModel | undefined> {
    try {
      const [forms]: FormularioModel[] = await BaseData.connection(
        this.tableName
      )
        .select("*")
        .where({ id_cliente });

      return forms;
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }

  public async getFormularios() {
    try {
      const results = await BaseData.connection(this.tableName).select("*");
      return results;
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }
  public async findFormularioByClientId(
    id_cliente: string
  ): Promise<FormularioModel | undefined> {
    try {
      const [forms]: FormularioModel[] = await BaseData.connection(
        this.tableName
      )
        .select("*")
        .where({ id_cliente });
  
      return forms;
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }
  
}
