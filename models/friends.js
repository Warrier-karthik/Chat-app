const pool = require('./database')

async function createFriend(userID_1, userID_2) {
    const result = await pool.query(`INSERT INTO friends 
        (userID_1, userID_2) 
        VALUES (?, ?)`, [userID_1, userID_2])
}
async function getfriends(userID) {
    const [rows] = await pool.query(`SELECT f.userID_1, u.Username, u.id 
        FROM friends f 
        JOIN users u on (f.userID_1 = ? AND u.id = f.userID_2) or (f.userID_2 = ? and u.id = f.userID_1)`, [userID, userID])
    return rows
}
module.exports = {
    createFriend: createFriend,
    getfriends: getfriends,

}