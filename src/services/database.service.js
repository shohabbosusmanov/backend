import db from "../config/db-config.js";

export default class DatabaseService {
    async createUser({ email, password }) {
        const { rows } = await db.query(
            `
            INSERT INTO users( email, password) VALUES($1,$2) RETURNING *;
            `,
            [email, password]
        );

        return rows[0];
    }

    async findUserEmail({ email }) {
        const { rows } = await db.query(
            `
            SELECT * FROM users WHERE email = $1;
            `,
            [email]
        );

        return rows[0];
    }

    async findUserById(userId) {
        const { rows } = await db.query(
            `
            SELECT * FROM users WHERE id = $1
            `,
            [userId]
        );

        return rows[0];
    }
}
