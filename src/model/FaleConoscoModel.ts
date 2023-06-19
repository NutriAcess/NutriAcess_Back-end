export enum AVALIACAO {
    um = '1',
    dois = '2',
    tres = '3',
    quatro = '4',
    cinco = '5',
    seis = '6',
    sete = '7',
    oito = '8',
    nove = '9',
    dez = '10'
}

export class FaleConoscoModel {

    constructor(
        private id: string,
        private avaliacao: AVALIACAO,
        private nome_usuario: string,
        private email: string,
        private mensagem: string
    )
        {}
    
    getId = () : string => {
        return this.id
    }

    getAvaliacao = () : AVALIACAO => {
        return this.avaliacao
    }

    getNome_usuario = () : string => {
        return this.nome_usuario
    }

    getEmail = () : string => {
        return this.email
    }

    getMensagem = () : string => {
        return this.mensagem
    }

    static toFaleConoscoModel (data:any): FaleConoscoModel {
        return new FaleConoscoModel(data.id,data.avaliacao,data.nome_usuario,
            data.email,data.mensagem);
    }
}