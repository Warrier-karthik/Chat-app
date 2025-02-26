const pool = require('./database')

async function createRequest(sendID, recID) {
    const result = await pool.query(`INSERT INTO requests (senderID, receiverID) 
        VALUES (?, ?)`, 
        [sendID, recID])
}
async function getrequests(recID) {
    const[rows] = await pool.query(`SELECT r.senderID, r.status, u.Username 
        FROM requests r
        JOIN users u on r.senderID = u.id
        WHERE r.receiverID = ?
        `, [recID])
    return rows;
}
async function setStatus(status, senderID, receiverID) {
    const result = await pool.query(`UPDATE requests SET 
        status = ? WHERE senderID = ? AND receiverID = ?`, 
        [status, senderID, receiverID])
}
module.exports = {
    createRequest: createRequest,
    getrequests: getrequests,
    setStatus: setStatus
}