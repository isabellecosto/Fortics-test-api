import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const fileName = fileURLToPath(import.meta.url)
const dirname = path.dirname(fileName)

const databasePath = path.resolve(dirname, "twitter.db")
console.log(databasePath)
const database = new sqlite3.Database(databasePath, (error) => {
    if (error) {
        console.error("Houve um erro na conexão do banco de dados", error.message);
    }else {
        console.log("Banco de dados conectado com sucesso")
    }
    
})

export default database