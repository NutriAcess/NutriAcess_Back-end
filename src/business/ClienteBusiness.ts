import { ClienteData } from "../data/ClienteData";
import { CustomError } from "../error/CustomError";
import { ClienteModel } from "../model/ClienteModel";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { ClienteInputDTO } from "../types/ClienteInputDTO";

export class ClienteBusiness {
  constructor(
    private hashGenerator: HashGenerator,
    private idGenerator: IdGenerator,
    private tokenGenerator: TokenGenerator,
    private clienteData: ClienteData
  ) {}

  public async signup  (clienteInput: ClienteInputDTO): Promise<string>  {
    try {
      const { nome_completo, nome_social, email, senha } = clienteInput;

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

      const existingCliente = await this.clienteData.findClienteByEmail(email);

      if (existingCliente) {
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

      const accessToken = this.tokenGenerator.generate({
        id: newCliente.getIdCliente(),
        email: newCliente.getEmail(),
      });

      return accessToken;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  public async login(email: string, senha: string): Promise<{ accessToken: string }> {
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

      return { accessToken };
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  public async getClienteById(id_cliente: string, token: string) {
    try {
      if (!token) {
        throw new CustomError(401, "Insert a token please!")
    }
    if (!id_cliente) {
      throw new CustomError(400,"Insert a id_cliente please!")
  }
  const clienteTokenData = this.tokenGenerator.verify(token)

  if(!clienteTokenData){
    throw new CustomError(401, "Invalid token!")
  }

  const cliente = await this.clienteData.findClienteById(id_cliente)

  if(!cliente){
    throw new CustomError(400,"There is no customer with that ID!")
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

  public async update(
    id_cliente: string,
    options: {
      nome_completo?: string;
      nome_social?: string;
      email?: string;
      senha?: string;
    }
  ) {
    try {
      if (!id_cliente) {
        throw new Error("Missing input: id_cliente is required.");
      }

      const cliente = await this.clienteData.findClienteById(id_cliente);
      if (!cliente) {
        throw new Error("Cliente not found.");
      }

      if (options.email) {
        const existingCliente = await this.clienteData.findClienteByEmail(
          options.email
        );
        if (
          existingCliente &&
          existingCliente.getIdCliente() !== id_cliente
        ) {
          throw new Error("Email already in use.");
        }
      }

      let novoHashSenha: string | undefined = undefined;
      if (options.senha && options.senha !== cliente.getSenha()) {
        if (options.senha.length < 6) {
          throw new Error("Invalid password.");
        }
        novoHashSenha = await this.hashGenerator.hash(options.senha);
      }

      if (options.nome_completo) {
        cliente.setNomeCompleto(options.nome_completo);
      }
      if (options.nome_social) {
        cliente.setNomeSocial(options.nome_social);
      }
      if (options.email) {
        cliente.setEmail(options.email);
      }
      if (novoHashSenha) {
        cliente.setSenha(novoHashSenha);
      }

      await this.clienteData.updateCliente(cliente);

      return "Client updated successfully.";
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}
