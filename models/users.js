const pool = require('./database')

async function createUser(username, firstname, lastname, email, password) {
    const result = await pool.query(`INSERT INTO users (Username, Firstname, Lastname, Email, Password) 
        VALUES (?, ?, ?, ?, ?)`, 
        [username, firstname, lastname, email, password])
}
async function getuser(username=null, ID=null) {
    let query, values;
    if (username) {
        query = `SELECT * FROM users WHERE Username = ?`;
        values = [username]
    } else if (ID) {
        query = `SELECT * FROM users WHERE id = ?`;
        values = [ID]
    } else {
        throw new Error("Need username or ID");
    }
    const [rows] = await pool.query(query, values)
    return rows
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