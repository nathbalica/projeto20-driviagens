import db from "../database/database.js";

const findCityByName = async (name) => {
    try {
        const result = await db.query('SELECT * FROM cities WHERE name = $1', [name]);
        return result.rows[0]; 
    } catch (error) {
        throw new Error(`Error finding city: ${error.message}`);
    }
};

const createCity = async (name) => {
    try {
        const result = await db.query('INSERT INTO cities (name) VALUES ($1) RETURNING *', [name]);
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error creating city: ${error.message}`);
    }
};

export { findCityByName, createCity };