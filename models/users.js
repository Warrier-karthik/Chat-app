const pool = require('./database')

async function createUser(username, firstname, lastname, email, password) {
    const result = await pool.query(`INSERT INTO users (Username, Firstname, Lastname, Email, Password) 
        VALUES (?, ?, ?, ?, ?)`, 
        [username, firstname, lastname, email, password])
}
async function getuser(username) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE Username = ?`, [username]);
    return rows;
}
async function allusers() {
    const [rows] = await pool.query(`SELECT * FROM users`)
    return rows
}

module.exports = {
    getuser: getuser,
    allusers: allusers,
    createUser: createUser
}