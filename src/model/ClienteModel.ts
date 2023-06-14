export class ClienteModel {
    constructor(
      private id_cliente: string,
      private nome_completo: string,
      private nome_social: string,
      private email: string,
      private senha: string
    ) {}
  
    getIdCliente = (): string => {
      return this.id_cliente;
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
      }    
  
    setIdCliente = (id_cliente: string): void => {
      this.id_cliente = id_cliente;
    };
    setNomeCompleto = (nome_completo: string): void => {
      this.nome_completo = nome_completo;
    };
    setNomeSocial = (nome_social: string): void => {
      this.nome_social = nome_social;
    };
    setEmail = (email: string): void => {
      this.email = email;
    };
    setSenha = (senha: string): void => {
      this.senha = senha;
    };
  
    static toClienteModel(data: any): ClienteModel {
      return new ClienteModel(
        data.id_cliente,
        data.nome_completo,
        data.nome_social,
        data.email,
        data.senha
      )
    }
  }
  