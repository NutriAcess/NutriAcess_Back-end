import { CustomError } from "../error/CustomError";
import { ClienteModel } from "../model/ClienteModel";
import { FormularioModel } from "../model/FormularioModel";
import { BaseData } from "./BaseData";

export class ClienteData extends BaseData {
  protected tableName: string = "cliente";
  nome_completo: any;

  public async createCliente(cliente: ClienteModel): Promise<void> {
    try {
      await BaseData.connection(this.tableName).insert({
        id_cliente: cliente.getIdCliente(),
        nome_completo: cliente.getNomeCompleto(),
        nome_social: cliente.getNomeSocial(),
        email: cliente.getEmail(),
        senha: cliente.getSenha(),
        telefone: cliente.getTelefone()
      });
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }
  public async findClienteByEmail(
    email: string
  ): Promise<ClienteModel | undefined> {
    try {
      const cliente = await BaseData.connection(this.tableName)
        .select("*")
        .where({ email: email });
      return cliente[0] && ClienteModel.toClienteModel(cliente[0]);
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }
  public async findClienteByTelefone(telefone: string): Promise<ClienteModel | undefined> {
    try {
      const cliente = await BaseData.connection(this.tableName)
        .select("*")
        .where({ telefone: telefone });
      return cliente[0];
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }
  
  public async findClienteById(
    id_cliente: string
  ): Promise<ClienteModel | undefined> {
    try {
      const [cliente]: ClienteModel[] = await BaseData.connection(
        this.tableName
      )
        .select("*")
        .where({ id_cliente: id_cliente });
      return cliente;
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }
  
  public async findClienteByNome(
    nome_completo: string
  ): Promise<ClienteModel | undefined> {
    try {
      const cliente = await BaseData.connection(this.tableName)
        .select("*")
        .where({ nome_completo: nome_completo });
      return cliente[0];
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }

  public async getClientes() {
    try {
      const results = await BaseData.connection(this.tableName).select("*");
      return results;
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }
  
  public async updateCliente( id_cliente: string,nome_completo: string, nome_social: string,email: string,  senha: string, telefone: string) {
    try {
      await BaseData.connection(this.tableName)
        .where({ id_cliente})
        .update({
          nome_completo,
          nome_social,
          email,
          senha,
          telefone
        });
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }
  public async findFormularioByUserId(id_cliente: string): Promise<FormularioModel | undefined> {
    try {
      const formulario = await BaseData.connection("formulario")
        .select("*")
        .where({ id_cliente: id_cliente });
  
      return formulario[0];
    } catch (error: any) {
      throw new CustomError(400, error.sqlMessage);
    }
  }
  
  
}
