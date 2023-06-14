import { ClienteData } from "../data/ClienteData";
import { CustomError } from "../error/CustomError";
import { ClienteModel } from "../model/ClienteModel";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";

export class ClienteBusiness {
  constructor(
    private hashGenerator: HashGenerator,
    private idGenerator: IdGenerator,
    private tokenGenerator: TokenGenerator,
    private clienteData: ClienteData
  ) {}
  public async signup(
    nome_completo: string,
    nome_social: string,
    email: string,
    senha: string
  ) {
    try {
      if (!nome_completo || !nome_social || !senha || !email) {
        throw new CustomError(422, "Missing input.");
      }
      if (senha.length < 6) {
        throw new CustomError(422, "Invalid password.");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        throw new CustomError(422, "Invalid email.");
      }

      const cliente = await this.clienteData.findClienteByEmail(email);

      if (cliente) {
        throw new CustomError(401, "Invalid credentials.");
      }
      const id = this.idGenerator.generate();
      const cypherSenha = await this.hashGenerator.hash(senha);

      const newCliente = new ClienteModel(
        id,
        nome_completo,
        nome_social,
        email,
        cypherSenha
      );

      await this.clienteData.createCliente(newCliente);

      const acessToken = this.tokenGenerator.generate({
        id,
      });
      return acessToken;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
  public async login(email: string, senha: string) {
    try {
      if (!email || !senha) {
        throw new CustomError(422, "Missing input.");
      }
      const cliente = await this.clienteData.findClienteByEmail(email);

      if (!cliente) {
        throw new CustomError(400, "User already created.");
      }

      const senhaIsCorrect = this.hashGenerator.compareHash(
        senha,
        cliente.getSenha()
      );

      if (!senhaIsCorrect) {
        throw new CustomError(401, "Invalid credentials.");
      }

      const accessToken = this.tokenGenerator.generate({
        id: cliente.getIdCliente(),
      });

      return { accessToken };
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
   public async getCliente (data: any)  {
    try {
      const { id_cliente, nome_completo } = data; 
  
      if (!nome_completo && !id_cliente) {
        throw new CustomError(422, "User name or id required");
      }
      if (id_cliente && !nome_completo) {
        const result = await this.clienteData.findClienteById(id_cliente);
        return result;
      } else if (nome_completo && !id_cliente) {
        const result = await this.clienteData.findClienteByNome(nome_completo);
        return result;
      } else {
        throw new CustomError(422, "User ID or name is required");
      }
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
  

  public async getAllClientes () {
    try {
      const clienteDataBase = new ClienteData();
      const results = await clienteDataBase.getClientes();
      return results;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
