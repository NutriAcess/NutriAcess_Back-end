import { ClienteData } from "../data/ClienteData";
import { FormularioData } from "../data/FormularioData";
import { CustomError } from "../error/CustomError";
import { ClienteModel } from "../model/ClienteModel";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { ClienteInputDTO, ClienteInputDTO2, TLogin, TUser } from "../types/ClienteInputDTO";
import { PlanosData } from "../data/PlanosData";


export class ClienteBusiness {
  constructor(
    private hashGenerator: HashGenerator,
    private idGenerator: IdGenerator,
    private tokenGenerator: TokenGenerator,
    private clienteData: ClienteData,
    private formularioData: FormularioData,
    private planosData: PlanosData 
  ) {}

  public async signup(clienteInput: ClienteInputDTO): Promise<string> {
    try {
      const { nome_completo, nome_social, email, senha, telefone } = clienteInput;

      if (!nome_completo || !senha || !email || !telefone) {
        throw new CustomError(422, "Missing input.");
      }

      if (senha.length < 6) {
        throw new CustomError(422, "Invalid password.");
      }
      
      const telefoneSemFormatacao = telefone.replace(/\D/g, "");

      if (telefoneSemFormatacao.length !== 11) {
        throw new CustomError(422, "Invalid phone number.");
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        throw new CustomError(422, "Invalid email.");
      }

      const existingCliente = await this.clienteData.findClienteByEmail(email);

      const existingTelefone = await this.clienteData.findClienteByTelefone(telefone)
      if (existingCliente) {
        throw new CustomError(401, "Invalid credentials.");
      }
      if (existingTelefone) {
        throw new CustomError(401, "Invalid credentials.");
      }
      const id = this.idGenerator.generate();
      const cypherSenha = await this.hashGenerator.hash(senha);

      const newCliente = new ClienteModel(
        id,
        nome_completo,
        nome_social,
        email,
        cypherSenha,
        telefone
      );

      await this.clienteData.createCliente(newCliente);

      const accessToken = this.tokenGenerator.generate({
        id: newCliente.getIdCliente(),
        email: newCliente.getEmail(),
      });

      return accessToken;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
  public async login(email: string, senha: string): Promise<TLogin> {
    try {
      if (!email || !senha) {
        throw new CustomError(422, "Missing input.");
      }
  
      const cliente = await this.clienteData.findClienteByEmail(email);
  
      if (!cliente) {
        throw new CustomError(400, "Client not found.");
      }
  
      const senhaIsCorrect = await this.hashGenerator.compareHash(
        senha,
        cliente.getSenha()
      );
  
      if (!senhaIsCorrect) {
        throw new CustomError(401, "Invalid credentials.");
      }
  
      const accessToken = this.tokenGenerator.generate({
        id: cliente.getIdCliente(),
        email: cliente.getEmail(),
      });
  
      const clientForm = await this.formularioData.findFormularioByUserId(
        cliente.getIdCliente()
      );
  
      const hasRespondedForm = !!clientForm;
  
      const user: TUser = {
        data: cliente,
        form: clientForm,
        hasRespondedForm: hasRespondedForm,
      };
  
      return { accessToken, user };
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
  

  public async getClienteById(id_cliente: string, token: string) {
    try {
      if (!token) {
        throw new CustomError(401, "Insert a token please!");
      }
      if (!id_cliente) {
        throw new CustomError(400, "Insert a id_cliente please!");
      }
      const clienteTokenData = this.tokenGenerator.verify(token);

      if (!clienteTokenData) {
        throw new CustomError(401, "Invalid token!");
      }

      const cliente = await this.clienteData.findClienteById(id_cliente);

      if (!cliente) {
        throw new CustomError(400, "There is no customer with that ID!");
      }
      return cliente;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  public async getAllClientes() {
    try {
      const results = await this.clienteData.getClientes();
      return results;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

//   public async updateClienteById(
//     id_cliente: string,token: string, nome_completo: string, nome_social: string,email: string,  senha: string, telefone: string
   
//   ) {
//     try {
      
//       const form = await this.clienteData.findClienteById(id_cliente);
//       if (!form) {
//         throw new CustomError(400, "Insert a id_cliente please!");
//       }
//       const tokenData = this.tokenGenerator.verify(token);

//       if (!tokenData) {
       
//         throw new CustomError(401, "Invalid token.");
//       }
      
//       if (!id_cliente) {
//         throw new CustomError(400, "Insert an id_formulario please!");
//       }
//       if (!nome_completo && !nome_social && !email && !senha && !telefone) {
//         throw new CustomError(400, "No fields provided to update.");
//       }
//       if (senha.length < 6) {
//         throw new CustomError(422, "Invalid password.");
//       }
      
//       const telefoneSemFormatacao = telefone.replace(/\D/g, "");

//       if (telefoneSemFormatacao.length !== 11) {
//         throw new CustomError(422, "Invalid phone number.");
//       }
      
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//       if (!emailRegex.test(email)) {
//         throw new CustomError(422, "Invalid email.");
//       }

//       const existingCliente = await this.clienteData.findClienteByEmail(email);

//       const existingTelefone = await this.clienteData.findClienteByTelefone(telefone)
//       if (existingCliente) {
//         throw new CustomError(401, "Invalid credentials.");
//       }
//       if (existingTelefone) {
//         throw new CustomError(401, "Invalid credentials.");
//       }
     

//       const update = await this.clienteData.updateCliente(id_cliente, nome_completo,
//         nome_social,
//         email,
//         senha,
//         telefone);
//   //  this.tokenGenerator.generate({
//   //       id: cliente.getIdCliente(),
//   //       email: cliente.getEmail(),
//   //     });
// console.log(update);

//       return update;
//     } catch (error: any) {
//       throw new CustomError(error.statusCode, error.message);
//     }
//   }
// public async updateCliente(id: string, clienteInput: ClienteInputDTO): Promise<void> {
//   try {
//     const { nome_completo, nome_social, email, senha, telefone } = clienteInput;

//     if (!nome_completo && !nome_social && !email && !senha && !telefone) {
//       throw new CustomError(422, "No fields to update.");
//     }

//     const existingCliente = await this.clienteData.findClienteById(id);

//     if (!existingCliente) {
//       throw new CustomError(400, "Client not found.");
//     }

//     const updatedCliente: Partial<ClienteModel> = {};

//     if (nome_completo) {
//       updatedCliente.nome_completo = nome_completo;
//     }

//     if (nome_social) {
//       updatedCliente.nome_social = nome_social;
//     }

//     if (email) {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//       if (!emailRegex.test(email)) {
//         throw new CustomError(422, "Invalid email.");
//       }

//       const existingEmail = await this.clienteData.findClienteByEmail(email);

//       if (existingEmail) {
//         throw new CustomError(409, "Email already in use.");
//       }

//       updatedCliente.email = email;
//     }

//     if (senha) {
//       if (senha.length < 6) {
//         throw new CustomError(422, "Invalid password.");
//       }

//       const cypherSenha = await this.hashGenerator.hash(senha);
//       updatedCliente.senha = cypherSenha;
//     }

//     if (telefone) {
//       const telefoneSemFormatacao = telefone.replace(/\D/g, "");

//       if (telefoneSemFormatacao.length !== 11) {
//         throw new CustomError(422, "Invalid phone number.");
//       }

//       const existingTelefone = await this.clienteData.findClienteByTelefone(telefone);

//       if (existingTelefone) {
//         throw new CustomError(409, "Phone number already in use.");
//       }

//       updatedCliente.telefone = telefone;
//     }

//     await this.clienteData.updateCliente(id, updatedCliente);
//   } catch (error: any) {
//     throw new CustomError(error.statusCode, error.message);
//   }
// }


  public async getClienteAndFormById(id_cliente: string, token: string) {
    try {
      if (!token) {
        throw new CustomError(401, "Insert a token please!");
      }
      if (!id_cliente) {
        throw new CustomError(400, "Insert a id_cliente please!");
      }
  
      const clienteTokenData = this.tokenGenerator.verify(token);
  
      if (!clienteTokenData) {
        throw new CustomError(401, "Invalid token!");
      }
  
      const cliente = await this.clienteData.findClienteById(id_cliente);
  
      if (!cliente) {
        throw new CustomError(400, "There is no customer with that ID!");
      }
  
      const formulario = await this.formularioData.findFormularioByUserId(id_cliente);
  
      const clienteAndForm = {
        cliente,
        formulario,
      };
  
      return clienteAndForm;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
  
}
