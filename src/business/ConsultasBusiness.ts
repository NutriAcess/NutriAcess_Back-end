import { ClienteData } from "../data/ClienteData";
import { ConsultasData } from "../data/ConsultasData";
import { NutricionistaData } from "../data/NutricionistaData";
import { CustomError } from "../error/CustomError";
import { ConsultasModel } from "../model/ConsultasModel";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { ConsultasInputDTO } from "../types/ConsultasInputDTO";
import { format } from "date-fns";
import { FaleConoscoInputDTO } from "../types/FaleConoscoInputDTO";

export class ConsultasBusiness {
  createFaleConosco(faleConoscoInput: FaleConoscoInputDTO) {
    throw new Error("Method not implemented.");
  }
  constructor(
    private tokenGenerator: TokenGenerator,
    private idGenerator: IdGenerator,
    private consultasData: ConsultasData,
    private clienteData: ClienteData,
    private nutriData: NutricionistaData
  ) {}
  public async createConsultas(input: ConsultasInputDTO) {
    try {
      const {
        token,
        data,
        hora,
        status,
        observacoes,
        id_nutricionista,
        id_cliente,
      } = input;

      if (!token) {
        throw new CustomError(401, `Authorization token is required`);
      }

      const tokenData = this.tokenGenerator.verify(token);

      if (!tokenData) {
        throw new CustomError(401, `Token not found!`);
      }
      if (
        !data ||
        !hora ||
        !status ||
        !observacoes ||
        !id_nutricionista ||
        !id_cliente
      ) {
        throw new CustomError(422, "Missing input.");
      }

      // Verificar se data e hora são objetos Date
      if (!(data instanceof Date)) {
        throw new CustomError(
          422,
          "Invalid data format. Expected a Date object."
        );
      }

      if (!(hora instanceof Date)) {
        throw new CustomError(
          422,
          "Invalid data format. Expected a Date object for 'hora'."
        );
      }

      // Formatar data e hora para comparar com a data e hora atuais
      const currentDate = new Date();
      const formattedData = format(data, "dd/MM/yyyy");
      const formattedHora = format(hora, "HH:mm:ss");
      const formattedCurrentDate = format(currentDate, "dd/MM/yyyy");
      const formattedCurrentHour = format(currentDate, "HH:mm:ss");

      // Verificar se a data informada é anterior ou igual à data atual
      if (formattedData < formattedCurrentDate) {
        throw new CustomError(
          422,
          "Invalid data. The date cannot be in the past."
        );
      }

      // Verificar se a hora informada é anterior ou igual à hora atual
      if (
        formattedData === formattedCurrentDate &&
        formattedHora < formattedCurrentHour
      ) {
        throw new CustomError(
          422,
          "Invalid hora. The hora cannot be in the past."
        );
      }
      const clienteExists = await this.clienteData.findClienteById(id_cliente);
      if (!clienteExists) {
        throw new CustomError(404, `Client could not be found!`);
      }
      const nutriExists = await this.nutriData.findNutricionistaById(
        id_nutricionista
      );
      if (!nutriExists) {
        throw new CustomError(404, `The nutritionist was not found!`);
      }

      const id_consulta = this.idGenerator.generate();
      const newConsultas = new ConsultasModel(
        id_consulta,
        data,
        hora,
        status,
        observacoes,
        id_nutricionista,
        id_cliente
      );

      await this.consultasData.createConsultas(newConsultas);
      return newConsultas;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  public async getConsultaById(id: string, token: string) {
    try {
      if (!token) {
        throw new CustomError(401, "Insert a token please!");
      }
      if (!id) {
        throw new CustomError(400, "Insert a id please!");
      }
      const consultaTokenData = this.tokenGenerator.verify(token);

      if (!consultaTokenData) {
        throw new CustomError(401, "Invalid token!");
      }

      const consulta = await this.consultasData.findConsultasById(id);

      if (!consulta) {
        throw new CustomError(400, "There is no query with this id!");
      }
      return consulta;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  public async getAllConsultas() {
    try {
      const results = await this.consultasData.getConsultas();
      return results;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}
