export class ConsultasModel {
constructor(
    private id: string,
    private data: Date,
    private hora: Date,
    private status: string,
    private observacoes: string,
    private id_nutricionista: string,
    private id_cliente: string
)
    {}

    getId = () : string => {
        return this.id
    }

    getData = () : Date => {
        return this.data
    }

    getHora = () : Date => {
        return this.hora
    }

    getStatus  = () : string => {
        return this.status
    }

    getObservacoes = () : string => {
        return this.observacoes
    }

    getId_nutricionista = () : string => {
        return this.id_nutricionista
    }

    getId_cliente = () : string => {
        return this.id_cliente
    }

    static toConsultaModel(data:any): ConsultasModel{
        return new ConsultasModel(data.id,data.data,data.hora,
            data.status,data.observacoes,data.id_nutricionista,data.id_cliente)
    }
}
