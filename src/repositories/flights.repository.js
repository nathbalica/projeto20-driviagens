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
    let query = `
        SELECT f.id, o.name as origin, d.name as destination, f.flight_date as date 
        FROM flights f
        JOIN cities o ON f.origin_id = o.id
        JOIN cities d ON f.destination_id = d.id
        WHERE 1=1
    `;

    const values = [];
    let index = 1;

    if (filters.origin) {
        query += ` AND o.name = $${index}`;
        values.push(filters.origin);
        index++;
    }

    if (filters.destination) {
        query += ` AND d.name = $${index}`;
        values.push(filters.destination);
        index++;
    }

    if (filters.smallerDate) {
        query += ` AND f.flight_date >= $${index}`;
        values.push(filters.smallerDate);
        index++;
    }
    
    if (filters.biggerDate) {
        query += ` AND f.flight_date <= $${index}`;
        values.push(filters.biggerDate);
        index++;
    } 

    query += ' ORDER BY f.flight_date ASC';

    const result = await db.query(query, values);
    console.log("Result:", result.rows);
    return result;
};

