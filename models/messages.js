const pool = require('./database')

async function saveMessage(senderID, receiverID, msg) {
    const result = await pool.query(`INSERT INTO messaged 
        (senderID, receiverID, message) 
        VALUES (?, ?, ?)`, [senderID, receiverID, msg])
}

async function getMessage(senderID, receiverID) {
    const [rows] = await pool.query(`SELECT * FROM messaged 
        WHERE (senderID = ? AND receiverID = ?) OR (senderID = ? AND receiverID = ?)`
        , [senderID, receiverID, receiverID, senderID])
    return rows;
}

module.exports = {
    saveMessage: saveMessage,
    getMessage: getMessage
}