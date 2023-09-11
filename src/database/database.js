import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const configDatabase = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "driven",
  database: process.env.DB_DATABASE || "driviagens"
};

if (process.env.NODE_ENV === "production") configDatabase.ssl = true;


const db = new Pool(configDatabase);


export default db;

db.query("SELECT 1")
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error.message);
  });



