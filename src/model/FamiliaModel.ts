export enum SEXO {
    homem = "homem",
    mulher = "mulher",
    outro = "outro"
}


export class FamiliaModel {
constructor(
    private id_familia: string,
    private nome: string,
    private idade: number,
    private sexo: SEXO,
    private peso: number,
    private id_cliente: string,
    private id_plano: string 
    )

    {}

    getId_familia = () : string => {
        return this.id_familia
    }

    getNome = () : string => {
        return this.nome
    }

    getIdade = () : number => {
        return this.idade
    }

    getSexo = () : SEXO => {
        return this.sexo
    }

    getPeso = () : number => {
        return this.peso
    }

    getId_cliente = () : string => {
        return this.id_cliente
    }

    getId_plano = () : string => {
        return this.id_plano
    }

    static toFamiliaModel (data:any): FamiliaModel {
        return new FamiliaModel(data.id_familia,data.nome,data.idade,data.sexo,
            data.peso,data.id_cliente,data.id_plano);
    }
}