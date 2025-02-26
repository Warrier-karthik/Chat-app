const express = require('express');
const router = express.Router()
const Request = require('../models/requests')
const User = require('../models/users')
const Friend = require("../models/friends")
router.post('/', async (req, res) => {
    const sender = await User.getuser(req.session.name)
    const receiver = await User.getuser(req.body.send)
    
    const request = await Request.createRequest(sender[0].id, receiver[0].id)
    res.redirect('/')
})
router.post('/setstatus', async (req, res) => {
    const sender = await User.getuser(req.body.sender)
    const receiver = await User.getuser(req.session.name)
    const statuschange = await Request.setStatus(req.body.status, sender[0].id, receiver[0].id)
    const addFriend = await Friend.createFriend(sender[0].id, receiver[0].id)
    res.redirect('/user')
})
module.exports = router