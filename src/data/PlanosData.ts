import { CustomError } from "../error/CustomError";
import { PlanosModel } from "../model/PlanosModel";
import { BaseData } from "./BaseData";


export class PlanosData extends BaseData {
    protected tableName: string = "planos";

public async createPlanos(plano: PlanosModel): Promise<void> {
    try {
        await BaseData.connection(this.tableName).insert({
            id_plano: plano.getId_plano(),
            tipo: plano.getTipo(),
            duracao: plano.getDuracao(),
            descricao: plano.getDescricao(),
            valor: plano.getValor()
        })
    } catch (error: any) {
        throw new CustomError(400, error.sqlMessage);
    }
}
public async findPlanosById(
    id_plano: string
): Promise<PlanosModel | undefined> {
    try {
        const [plano]: PlanosModel[] = await BaseData.connection(
            this.tableName
        )
            .select("*")
            .where({ id_plano: id_plano });
        return plano;
    } catch (error: any) {
        throw new CustomError(400,error.sqlMessage);
    }
}
    public async getPlanos() {
        try {
        const results = await BaseData.connection(this.tableName).select(
            "*"
        );
        return results;
        } catch (error: any) {
        throw new CustomError(400, error.sqlMessage);
        }
    }
    }