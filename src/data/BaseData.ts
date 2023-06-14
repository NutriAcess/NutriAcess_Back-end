import knex, { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

export class BaseData {
    protected static connection: Knex = knex({
        client: "mysql",
        connection: {
            host: process.env.DB_HOST,
            port: Number(3306 || "3306"),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_SCHEMA,
            multipleStatements: true
        }
    });
}