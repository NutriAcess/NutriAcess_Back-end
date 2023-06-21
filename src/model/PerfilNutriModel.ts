export class PerfilNutriModel {
  constructor(
    private id_perfil: string,
    private nome: string,
    private foto: string,
    private instagram: string,
    private bio: string,
    private especialidades: string
  ) {}

  getIdPerfil = (): string => {
    return this.id_perfil;
  };
  getNome = (): string => {
    return this.nome;
  };
  getFoto= (): string => {
    return this.foto;
  };
  getInstagram = (): string => {
    return this.instagram;
  };
  getBio= (): string => {
    return this.bio;
  };
  getEspecialidades = (): string => {
      return this.especialidades;
    }    

    
  static toPerfilNutriModel(data: any): PerfilNutriModel {
    return new PerfilNutriModel(
      data.id_perfil,
      data.nome,
      data.foto,
      data.instagram,
      data.bio,
      data.especialidades
    )
  }
}
