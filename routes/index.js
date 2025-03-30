const express = require('express');
const router = express.Router()
const User = require('../models/users')
const Friends = require('../models/friends');
const friends = require('../models/friends');
router.get('/', async (req, res) => {
    const users = await User.allusers()
    if (req.session.isAuthenticated) {
        const user = await User.getuser(req.session.name)
        const friends = await Friends.getfriends(user[0].id)
        res.render('index', {users: users, friends: friends})
    }
    else {
        res.render('index', {users: users})
    }
    
})

module.exports = router