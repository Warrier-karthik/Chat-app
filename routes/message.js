const express = require('express')
const router = express.Router()
const Messages = require('../models/messages')
const Users = require('../models/users')
const socket = require('../socket')
const date = new Date()
router.get('/:id', async (req, res) => {
    const receiver = await Users.getuser(null, req.params.id)
    const sender = await Users.getuser(req.session.name)
    const messages = await Messages.getMessage(sender[0].id, receiver[0].id)
    res.render('chat.ejs', {senderID: sender[0].id, receiverID: receiver[0].id, messages: messages, friend: receiver[0]})
})

router.post('/send', async (req, res) => {
    const sendID = req.body.senderID
    const recID = req.body.receiverID
    const msg = req.body.message
    const result = await Messages.saveMessage(sendID, recID, msg)
    
    console.log("everything successful")
    
})

module.exports = router