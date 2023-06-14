export class ClienteModel {
    constructor(
        private id_cliente: string,
        private nome_completo: string,
        private nome_social: string,
        private email: string,
        private senha: string
    )
     {}

    getIdCliente = ():string => {
        return this.id_cliente
    }
    getNomeCompleto = ():string => {
        return this.nome_completo
    }
    getNomeSocial = ():string => {
        return this.nome_social
    }
    getEmail = ():string => {
        return this.email
    }
    getSenha = ():string => {
        return this.senha
    }
   
    static toClienteModel(data: any): ClienteModel {
        return new ClienteModel(data.id_cliente, data.nome_completo, data.nome_social, data.email, data.senha);

      }
}
