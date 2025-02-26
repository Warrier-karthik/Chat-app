const express = require('express');
const router = express.Router()
const Request = require('../models/requests')
const User = require('../models/users')
router.post('/', async (req, res) => {
    const sender = await User.getuser(req.session.name)
    const receiver = await User.getuser(req.body.send)
    const request = await Request.createRequest(sender[0].id, receiver[0].id)
    res.redirect('/')
})

module.exports = router