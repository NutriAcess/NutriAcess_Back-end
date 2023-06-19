import { NutricionistaData } from "../data/NutricionistaData";
import { CustomError } from "../error/CustomError";
import { NutricionistaModel } from "../model/NutricionistaModel";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { NutriInputDTO } from "../types/NutriInputDTO";

export class NutricionistaBusiness {
  constructor(
    private hashGenerator: HashGenerator,
    private idGenerator: IdGenerator,
    private tokenGenerator: TokenGenerator,
    private nutriData: NutricionistaData
  ){}
  public async signup(
    nutriInput : NutriInputDTO
  ) : Promise<string>{

    try {
      const { nome_completo, nome_social, email, senha ,especialidade, crn} = nutriInput;
      if (!nome_completo || !nome_social || !senha || !email || !crn || !especialidade) {
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

      const newNutri = new NutricionistaModel(id, nome_completo, nome_social, email, cypherSenha, especialidade, crn);

      await this.nutriData.createNutricionista(newNutri);

      const acessToken = this.tokenGenerator.generate({
       id: newNutri.getIdNutricionista(),
        email: newNutri.getEmail(),
      });

      return acessToken ;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
  public async login(crn: string, senha: string): Promise<{ accessToken: string }> {
    try {
      if (!crn || !senha) {
        throw new CustomError(422, "Missing input.");
      }
      const nutri = await this.nutriData.findNutricionistaByCrn(crn);
  
      if (!nutri) {
        throw new CustomError(400, "User not found.");
      }
  
      const senhaIsCorrect = await this.hashGenerator.compareHash(
        senha,
        nutri.getSenha()
      );
  
      if (!senhaIsCorrect) {
        throw new CustomError(401, "Invalid credentials.");
      }
  
      const accessToken = this.tokenGenerator.generate({
        id: nutri.getIdNutricionista(),
        email: nutri.getEmail(),
      });
     
  
      return { accessToken };
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
  
  public async getNutriById(id_nutricionista: string, token: string) {
    try {
      if (!token) {
        throw new CustomError(401, "Insert a token please!")
    }
    if (!id_nutricionista) {
      throw new CustomError(400,"Insert a id_nutricionista please!")
  }
  const nutriTokenData = this.tokenGenerator.verify(token)

  if(!nutriTokenData){
    throw new CustomError(401, "Invalid token!")
  }

  const nutri = await this.nutriData.findNutricionistaById(id_nutricionista)

  if(!nutri){
    throw new CustomError(400,"There is no nutritionist with that ID!")
  }
  return nutri;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
  public async getNutriByEspecialidade(id_nutricionista: string, token: string) {
    try {
      if (!token) {
        throw new CustomError(401, "Insert a token please!")
    }
    if (!id_nutricionista) {
      throw new CustomError(400,"Insert a id_nutricionista please!")
  }
  const nutriTokenData = this.tokenGenerator.verify(token)

  if(!nutriTokenData){
    throw new CustomError(401, "Invalid token!")
  }

  const nutri = await this.nutriData.findNutricionistaById(id_nutricionista)

  if(!nutri){
    throw new CustomError(400,"There is no nutritionist with that ID!")
  }
  return nutri;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
  public async getAllNutricionistas () {
    try {
     
      const results = await this.nutriData.getNutricionistas();
      return results;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
