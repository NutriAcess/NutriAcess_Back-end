import { ClienteData } from "../data/ClienteData";
import { CustomError } from "../error/CustomError";
import { ClienteModel } from "../model/ClienteModel";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";

export class FormularioBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private formData: FormData
  ) {}
  // public async create(
    
  // ) {
  //   try {
  //     if (!nome || !objetivo || !altura || !idade || !peso || !capacidade_fisica || !restricao_alimentar || !tempo_preparo || !foto || !id_formulario) {
  //       throw new CustomError(422, "Missing input.");
  //     }
     
  //   } catch (error: any) {
  //     throw new CustomError(error.statusCode, error.message);
  //   }
  // }
  
  //  public async getFormulario (data: any)  {
  //   try {
  //     const { id_cliente, nome_completo } = data; 
  
  //     if (!nome_completo && !id_cliente) {
  //       throw new CustomError(422, "User name or id required");
  //     }
  //     if (id_cliente && !nome_completo) {
  //       const result = await this.clienteData.findClienteById(id_cliente);
  //       return result;
  //     } else if (nome_completo && !id_cliente) {
  //       const result = await this.clienteData.findClienteByNome(nome_completo);
  //       return result;
  //     } else {
  //       throw new CustomError(422, "User ID or name is required");
  //     }
  //   } catch (error: any) {
  //     throw new CustomError(error.statusCode, error.message);
  //   }
  // };
  

  // public async getAllFormularios () {
  //   try {
  //     const clienteDataBase = new ClienteData();
  //     const results = await clienteDataBase.getClientes();
  //     return results;
  //   } catch (error: any) {
  //     throw new CustomError(error.statusCode, error.message);
  //   }
  // };
  // public async update(
  //   id_cliente: string,
  //   options: {
  //     nome_completo?: string;
  //     nome_social?: string;
  //     email?: string;
  //     senha?: string;
  //   }
  // ) {
  //   try {
  //     if (!id_cliente) {
  //       throw new Error("Missing input: id_cliente is required.");
  //     }
  
  //     const cliente = await this.clienteData.findClienteById(id_cliente);
  //     if (!cliente) {
  //       throw new Error("Cliente not found.");
  //     }
  
  //     if (options.email) {
  //       const existingCliente = await this.clienteData.findClienteByEmail(options.email);
  //       if (existingCliente && existingCliente.getIdCliente() !== id_cliente) {
  //         throw new Error("Email already in use.");
  //       }
  //     }
  
  //     let novoHashSenha: string | undefined = undefined;
  //     if (options.senha && options.senha !== cliente.getSenha()) {
  //       if (options.senha.length < 6) {
  //         throw new Error("Invalid password.");
  //       }
  //       novoHashSenha = await this.hashGenerator.hash(options.senha);
  //     }
  
  //     if (options.nome_completo) {
  //       cliente.setNomeCompleto(options.nome_completo);
  //     }
  //     if (options.nome_social) {
  //       cliente.setNomeSocial(options.nome_social);
  //     }
  //     if (options.email) {
  //       cliente.setEmail(options.email);
  //     }
  //     if (novoHashSenha) {
  //       cliente.setSenha(novoHashSenha);
  //     }
  
  //     await this.clienteData.updateCliente(cliente);
  
  //     return "Client updated successfully.";
  //   } catch (error: any) {
  //     throw new CustomError(error.statusCode, error.message);
  //   }
  // }
  
}
