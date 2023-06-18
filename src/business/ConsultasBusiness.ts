import { ConsultasData } from "../data/ConsultasData";
import { CustomError } from "../error/CustomError";
import { ConsultasModel } from "../model/ConsultasModel";
import { IdGenerator } from "../services/idGenerator";
import { ConsultasInputDTO } from "../types/ConsultasInputDTO";

export class ConsultasBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private consultasData: ConsultasData
  ) {}
  public async createConsultas(input: ConsultasInputDTO) {
    try {
      const { data, hora, status, observacoes, id_nutricionista, id_cliente } =
        input;
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

      // if (!(data instanceof Date)) {
      //   throw new CustomError(
      //     422,
      //     "Invalid data format. Expected a Date object."
      //   );
      // }

      // if (!(hora instanceof Date)) {
      //   throw new CustomError(
      //     422,
      //     "Invalid data format. Expected a Date object for 'hora'."
      //   );
      // }

      // if (isNaN(hora.getTime())) {
      //   throw new CustomError(
      //     422,
      //     "Invalid hora value. Expected a valid Date object for 'hora'."
      //   );
      // }

      const currentDateTime = new Date();

      // Formatando a data e hora atual
      const currentDate = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate());
      const currentHour = new Date(0, 0, 0, currentDateTime.getHours(), currentDateTime.getMinutes(), currentDateTime.getSeconds());

      // Verifica se a data informada é anterior ou igual à data atual
      if (data < currentDate) {
        throw new CustomError(422, "Invalid data. The date cannot be in the past.");
      }

      // Verifica se a hora informada é anterior ou igual à hora atual
      if (data.getTime() === currentDate.getTime() && hora < currentHour) {
        throw new CustomError(422, "Invalid hora. The hora cannot be in the past.");
      }
      
      const id = this.idGenerator.generate();
      const newConsultas = new ConsultasModel(
        id,
        data, 
        hora, 
        status,
        observacoes,
        id_nutricionista, 
        id_cliente
      )

      await this.consultasData.createConsultas(newConsultas);
      return newConsultas;


    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
  public async getConsultas(data: any) {
    try {
      const { id } = data;

      if (!id) {
        throw new CustomError(422, "User name or ID is required");
      }
      if (id) {
        const result = await this.consultasData.findConsultasById(id);
        return result;
      } else {
        throw new CustomError(422, "User ID or name is required");
      }
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}
