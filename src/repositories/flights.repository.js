import db from "../database/database.js";

// Encontre uma cidade pelo ID
export const findCityById = async (id) => {
    const query = 'SELECT * FROM cities WHERE id = $1';
    const values = [id];

    const result = await db.query(query, values);
    return result.rows[0];
};

// Crie um novo voo
export const createFlight = async (flightData) => {
    const query = `
        INSERT INTO flights(origin_id, destination_id, flight_date)
        VALUES($1, $2, $3)
        RETURNING *;
    `;
    const values = [flightData.origin, flightData.destination, new Date(flightData.date.split('-').reverse().join('-'))];

    const result = await db.query(query, values);
    return result.rows[0];
};

export { findFlightsByNames, createPassenger };