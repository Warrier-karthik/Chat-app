const express = require('express');
const router = express.Router()
const User = require('../models/users')
router.get('/', async (req, res) => {
    const users = await User.allusers()
    
    res.render('index', {users: users})
})

module.exports = router