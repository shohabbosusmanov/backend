import pg from "pg";

const { Pool } = pg;

console.log(process.env.DATABASE_URL);

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default db;
