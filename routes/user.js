const express = require('express');
const router = express.Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')
const Request = require('../models/requests')
const Friend = require('../models/friends')
let msg;
//Get URL
router.get('/', async (req, res) => {
    const user = await User.getuser(req.session.name)
    const requests = await Request.getrequests(user[0].id)
    res.render('user', {user:user[0], requests: requests})
})

router.get('/register', (req, res) => {
    res.render('register', {msg:msg})
})
router.get('/login', (req, res) => {
    res.render('login', {msg: msg})
})
router.get('/logout', (req, res)=> {
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
        }
        res.clearCookie('connect.sid')
        res.redirect('/')
    })
})
router.get('/friends', async (req, res) => {
    const user = await User.getuser(req.session.name)
    const friends = await Friend.getfriends(user[0].id)
    res.render('friends', {friends: friends})
})
//POST URL
router.post('/register', async (req, res) => {
    const user = await User.getuser(req.body.username)
    const encryptedpwd = await bcrypt.hash(req.body.password, 10)
    if (user.length > 0 ){
        res.redirect('./register')
        msg = "username already exists"
    }
    
    else if (req.body.password != req.body.Cpassword){
            res.redirect('./register')
            msg = "Passwords do not match"
        }
    else {
        const result = await User.createUser(req.body.username, req.body.Fname, req.body.Lname, req.body.email, encryptedpwd)
        res.redirect('./login')
        msg = ""
    }
    
})

router.post('/login', async (req, res) => {
    const user = await User.getuser(req.body.username)
    if (await bcrypt.compare(req.body.password, user[0].Password))
    {
        req.session.isAuthenticated = true;
        req.session.name = req.body.username;
        msg = "";
        res.redirect('/')
    }
    else
    {
        msg = "Credentials do not match"
        res.redirect('./login')
        
    }
})
module.exports = router
