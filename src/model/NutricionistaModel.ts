export enum SpecialtyNutriEnum {
    sport = "Nutrição Esportiva",
    functional = "Nutrição Funcional",
    esthetics = "Nutrição Estética",
    integrative  = "Nutrição Integrativa",
    maternalChild  = "Materno-Infantil",
    family = "Nutrição Familiar"
  }
export class NutricionistaModel {
  constructor(
    private id_nutricionista: string,
    private nome_completo: string,
    private nome_social: string,
    private email: string,
    private senha: string,
    private crn: string,
    private telefone: string,
    private especialidade: SpecialtyNutriEnum
  ) {}

  getIdNutricionista = (): string => {
    return this.id_nutricionista;
  };
  getNomeCompleto = (): string => {
    return this.nome_completo;
  };
  getNomeSocial = (): string => {
    return this.nome_social;
  };
  getEmail = (): string => {
    return this.email;
  };
  getSenha = (): string => {
    return this.senha;
  };

  getCrn = (): string => {
    return this.crn;
  };
  getTelefone = (): string => {
    return this.telefone;
  };
  getEspecialidade = (): string => {
    return this.especialidade;
  };
  static toNutricionistaModel(data: any): NutricionistaModel {
    return new NutricionistaModel(
      data.id_nutricionista,
      data.nome_completo,
      data.nome_social,
      data.email,
      data.senha,
      data.crn,
      data.telefone,
      data.especialidade
    );
  }
}
