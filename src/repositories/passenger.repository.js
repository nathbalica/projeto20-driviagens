import db from "../database/database.js";

const findPassengerByNames = async (first_name, last_name) => {
    try {
        const result = await db.query('SELECT * FROM passengers WHERE first_name = $1 AND last_name = $2', [first_name, last_name]);
        console.log(result);
        return result.rows[0]; // retorna undefined se não encontrar nenhuma linha
    } catch (error) {
        throw new Error(`Error finding passenger: ${error.message}`);
    }
};

const createPassenger = async (first_name, last_name) => {
    try {
        const result = await db.query('INSERT INTO passengers (first_name, last_name) VALUES ($1, $2) RETURNING *', [first_name, last_name]);
        return result.rows[0]; // retorna o passageiro recém-criado
    } catch (error) {
        throw new Error(`Error creating passenger: ${error.message}`);
    }
};

export { findPassengerByNames, createPassenger };
