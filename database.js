const mysql = require('mysql2')
const dotenv = require('dotenv')
const { get } = require('./routes')
dotenv.config()
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise()

async function createUser(username, firstname, lastname, email, password) {
    const result = await pool.query(`INSERT INTO users (Username, Firstname, Lastname, Email, Password) 
        VALUES (?, ?, ?, ?, ?)`, 
        [username, firstname, lastname, email, password])
}
async function getuser(username) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE Username = ?`, [username]);
    return rows;
}
module.exports = {
    createUser: createUser,
    getuser: getuser
}