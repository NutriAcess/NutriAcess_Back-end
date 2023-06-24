import { threadId } from "worker_threads";
import { FamiliaData } from "../data/FamiliaData";
import { CustomError } from "../error/CustomError";
import { IdGenerator } from "../services/idGenerator";
import { FamiliaInputDTO } from "../types/FamiliaInputDTO";
import { ClienteData } from "../data/ClienteData";
import { TokenGenerator } from "../services/tokenGenerator";
import { PlanosData } from "../data/PlanosData";
import { FamiliaModel } from "../model/FamiliaModel";
import { FamiliaClienteData } from "../data/FamiliaClienteData";
import { FamiliaClienteInputDTO } from "../types/FamiliaClienteInputDTO";
import { FamiliaClienteModel } from "../model/FamiliaClienteModel";

export class FamiliaClienteBusiness {
  constructor(
    private tokenGenerator: TokenGenerator,
    private clienteData: ClienteData,
    private idGenerator: IdGenerator,
    private familiaData: FamiliaData,
    private familiaClienteData: FamiliaClienteData
  ) {}
  public async createFamiliaCliente(input: FamiliaClienteInputDTO) {
    try {
      const { token, id_cliente, id_familia } = input;
      if ( !id_familia || !id_cliente) {
        throw new CustomError(422, "Missing input");
      }

      if (!token) {
        throw new CustomError(401, `Authorization token is required`);
      }

      const tokenData = this.tokenGenerator.verify(token);

      if (!tokenData) {
        throw new CustomError(401, "Invalid token!");
      }

      const clienteExists = await this.clienteData.findClienteById(id_cliente);
      const familiaExists = await this.familiaData.findFamiliaById(id_familia);
      if (!clienteExists) {
        throw new CustomError(404, `Client could not be found!`);
      }
      if (!familiaExists) {
        throw new CustomError(404, `Could not find the plan!`);
      }
      const id_familia_cliente = this.idGenerator.generate();
      const newFamilia = new FamiliaClienteModel(
        id_familia_cliente,
        id_cliente,
        id_familia
        
      );
      await this.familiaClienteData.createFamiliaCliente(newFamilia);
      return newFamilia;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
  public async getFamiliaClienteById(
    id_familia_cliente: string,
    token: string
  ) {
    try {
      if (!token) {
        throw new CustomError(401, "Insert a token please!");
      }
      if (!id_familia_cliente) {
        throw new CustomError(400, "Insert a id_familia please!");
      }
      const familiaTokenData = this.tokenGenerator.verify(token);

      if (!familiaTokenData) {
        throw new CustomError(401, "Invalid token!");
      }

      const famila = await this.familiaClienteData.findFamiliaClienteById(
        id_familia_cliente
      );

      if (!famila) {
        throw new CustomError(400, "There is no family with that ID!");
      }
      return famila;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  public async getAllFamilias() {
    try {
      const results = await this.familiaClienteData.getFamiliaCliente();
      return results;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}
