export class FamiliaClienteModel{
constructor(
    private id_familia_cliente: string,
    private id_cliente: string,
    private id_familia: string
)
    {}
   
    getId_familia_cliente = () : string => {
        return this.id_familia_cliente
    }

    getId_cliente = () : string => {
        return this.id_cliente
    }

    getId_familia = () : string => {
        return this.id_familia
    }
        static toFamiliaClienteModel (data:any): FamiliaClienteModel {
            return new FamiliaClienteModel(data.id_familia_cliente,data.id_cliente,data.id_familia);
        }
}