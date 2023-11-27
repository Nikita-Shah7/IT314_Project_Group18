const Pool = require("pg").Pool;
require('dotenv').config();

// const pool = new Pool({
//     user: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     host: process.env.POSTGRES_HOST,
//     port: process.env.DB_PORT,
//     database: process.env.POSTGRES_DATABASE
// });

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

module.exports = pool;