const mysql = require('mysql2/promise'); // Use the promise-based version of mysql2
require('dotenv').config();

// Create a connection pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Maximum number of connections in the pool
    queueLimit: 0 // No limit for request queue
});

console.log('Connected to MySQL database.');

module.exports = db;