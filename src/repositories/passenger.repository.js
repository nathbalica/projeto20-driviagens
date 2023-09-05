import db from "../database/database.js";

const findPassengerByNames = async (firstName, lastName) => {
    try {
        const result = await db.query('SELECT * FROM passengers WHERE "firstName" = $1 AND "lastName" = $2', [firstName, lastName]);
        return result.rows[0]; // retorna undefined se não encontrar nenhuma linha
    } catch (error) {
        throw new Error(`Error finding passenger: ${error.message}`);
    }
};

const createPassenger = async (firstName, lastName) => {
    try {
        const result = await db.query('INSERT INTO passengers ("firstName", "lastName") VALUES ($1, $2) RETURNING *', [firstName, lastName]);
        return result.rows[0]; // retorna o passageiro recém-criado
    } catch (error) {
        throw new Error(`Error creating passenger: ${error.message}`);
    }
};

export { findPassengerByNames, createPassenger };
