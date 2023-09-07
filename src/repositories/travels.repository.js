import db from "../database/database.js";


export const findPassengerById = async (id) => {
    const query = 'SELECT * FROM passengers WHERE id = $1';
    const values = [id];

    const result = await db.query(query, values);

    return result.rows[0];
}

export const findFlightById = async (id) => {
    const query = 'SELECT * FROM flights WHERE id = $1';
    const values = [id];

    const result = await db.query(query, values);

    return result.rows[0];
}

export const createTravel = async (passengerId, flightId) => {
    const query = 'INSERT INTO travels(passenger_id, flight_id) VALUES($1, $2) RETURNING *';
    const values = [passengerId, flightId];

    const result = await db.query(query, values);

    return result.rows[0];
}