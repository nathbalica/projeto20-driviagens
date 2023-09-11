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

const getPassengerTravels = async (name, page = 1) => {
    let query = `
        SELECT 
            p.first_name || ' ' || p.last_name AS passenger,
            COUNT(t.id) AS travels
        FROM 
            passengers p
        LEFT JOIN 
            travels t ON p.id = t.passenger_id
    `;

    const values = [];
    let index = 1;  // Initialize parameter index

    if (name) {
        query += ` WHERE p.first_name ILIKE $${index} OR p.last_name ILIKE $${index + 1}`;
        values.push(`%${name}%`, `%${name}%`);
        index += 2;  // Increase the index by 2 because you added two values
    }

    query += ' ORDER BY travels DESC LIMIT 10 OFFSET $' + index;
    values.push((page - 1) * 10);

    return await db.query(query, values);
};

export { findPassengerByNames, createPassenger, getPassengerTravels };
