import { NutricionistaData } from "../data/NutricionistaData";
import { CustomError } from "../error/CustomError";
import { NutricionistaModel } from "../model/NutricionistaModel";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";

export class NutricionistaBusiness {
  constructor(
    private hashGenerator: HashGenerator,
    private idGenerator: IdGenerator,
    private tokenGenerator: TokenGenerator,
    private nutriData: NutricionistaData
  ){}
  public async signup(
    nome_completo: string,
    nome_social:string,
    email: string,
    senha:string,
    crn: string
  ) {

    try {
      if (!nome_completo || !nome_social || !senha || !email || !crn) {
        throw new CustomError(422, "Missing input.");
      }
      if (senha.length < 6) {
        throw new CustomError(422, "Invalid password.");
      }
      const crnRegex = /^\d+$/;

    if (!crnRegex.test(crn)) {
      throw new CustomError(422, "Invalid crn. Only numbers are allowed.");
    }
      if (crn.length < 6 || crn.length > 6) {
        throw new CustomError(422, "Invalid crn.");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        throw new CustomError(422, "Invalid email.");
      }
      
      const nutri = await this.nutriData.findNutricionistaByEmail(email);
      const verification_crn = await this.nutriData.findNutricionistaByCrn(crn);

      if (nutri) {
        throw new CustomError(401, "Invalid credentials.");
      }
      if (verification_crn) {
        throw new CustomError(401, "Invalid credentials.");
      }
      const id = this.idGenerator.generate();
      const cypherSenha = await this.hashGenerator.hash(senha);

      const newNutri = new NutricionistaModel(id, nome_completo, nome_social, email, cypherSenha, crn);

      await this.nutriData.createNutricionista(newNutri);

      const acessToken = this.tokenGenerator.generate({
        id
      });
      return acessToken ;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
  public async login(crn: string, senha: string) {
    try {
      if (!crn || !senha) {
        throw new CustomError(422, "Missing input.");
      }
      const nutri = await this.nutriData.findNutricionistaByCrn(crn);

      if (!nutri) {
        throw new CustomError(400, "User already created.");
      }

      const senhaIsCorrect = this.hashGenerator.compareHash(
        senha,
        nutri.getSenha()
      );

      if (!senhaIsCorrect) {
        throw new CustomError(401, "Invalid credentials.");
      }

      const accessToken = this.tokenGenerator.generate({
        id: nutri.getIdNutricionista()
      });

      return { accessToken };
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
  public async getNutricionista (data: any)  {
    try {
      const { id_nutricionista, nome_completo } = data; 
  
      if (!nome_completo && !id_nutricionista) {
        throw new CustomError(422, "User name or id required");
      }
      if (id_nutricionista && !nome_completo) {
        const result = await this.nutriData.findNutricionistaById(id_nutricionista);
        return result;
      } else if (nome_completo && !id_nutricionista) {
        const result = await this.nutriData.findNutricionistaByNome(nome_completo);
        return result;
      } else {
        throw new CustomError(422, "User ID or name is required");
      }
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
  

  public async getAllNutricionistas () {
    try {
      const nutriDataBase = new NutricionistaData();
      const results = await nutriDataBase.getNutricionistas();
      return results;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
