export enum TIPO {
    plus1 = "plus1",
    familia = "familia",
    plus2 = "plus2"
}

export class PlanosModel {
constructor(
    private id_plano: string,
    private tipo: TIPO,
    private duracao: string,
    private descricao: string,
    private valor: number
    )
        {}
    
    getId_plano = () : string => {
        return this.id_plano
    }

    getTipo = () : TIPO => {
        return this.tipo
    }

    getDuracao = () : string => {
        return this.duracao
    }

    getDescricao = () : string => {
        return this.descricao
    }

    getValor = () : number => {
        return this.valor
    }

    static toPlanosModel (data:any): PlanosModel{
        return new PlanosModel(data.id_plano,data.tipo,data.duracao,data.descricao,data.valor);
    }

}