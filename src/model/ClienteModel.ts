export class ClienteModel {
    constructor(
      private id_cliente: string,
      private nome_completo: string,
      private nome_social: string,
      private email: string,
      private senha: string,
      private telefone: string
    ) {
      this.id_cliente = id_cliente;
      this.nome_completo = nome_completo;
      this.nome_social = nome_social;
      this.email = email;
      this.senha = senha;
    this.telefone = telefone;}
  
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
      getTelefone= (): string => {
        return this.telefone;
      }
      setIdCliente = (id: string): void => {
        this.id_cliente = id;
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
      
      setTelefone = (telefone: string): void => {
        this.telefone = telefone;
      };
      
    static toClienteModel(data: any): ClienteModel {
      return new ClienteModel(
        data.id_cliente,
        data.nome_completo,
        data.nome_social,
        data.email,
        data.senha,
        data.telefone
      )
    }
  }
  