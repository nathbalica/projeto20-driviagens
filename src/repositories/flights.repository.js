import db from "../database/database.js";

// Encontre uma cidade pelo ID
export const findCityById = async (id) => {
    const query = 'SELECT * FROM cities WHERE id = $1';
    const values = [id];

    const result = await db.query(query, values);
    return result.rows[0];
};

// Crie um novo voo
export const createFlight = async (origin, destination, date) => {
    const query = `
        INSERT INTO flights(origin_id, destination_id, flight_date)
        VALUES($1, $2, $3)
        RETURNING *;
    `;
    const values = [origin, destination, date];

    const result = await db.query(query, values);
    return result.rows[0];
};


export const getFilteredFlights = async (filters) => {
    let query = 'SELECT id, origin, destination, date FROM flights WHERE 1=1';
    const values = [];

    if (filters.origin) {
        query += ' AND origin = ?';
        values.push(filters.origin);
    }

    if (filters.destination) {
        query += ' AND destination = ?';
        values.push(filters.destination);
    }

    if (filters.biggerDate) {
        query += ' AND date >= ?';
        values.push(filters.biggerDate);
    }

    if (filters.smallerDate) {
        query += ' AND date <= ?';
        values.push(filters.smallerDate);
    }

    query += ' ORDER BY date ASC';

    return await db.query(query, values);
};

