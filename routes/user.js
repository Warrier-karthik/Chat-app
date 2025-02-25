const express = require('express');
const router = express.Router()
const db = require('../database')
const bcrypt = require('bcrypt')
let msg;
//Get URL
router.get('/', async (req, res) => {
    const user = await db.getuser(req.session.name)
    res.render('user', {user:user[0]})
})

router.get('/register', (req, res) => {
    res.render('register', {msg:msg})
})
router.get('/login', (req, res) => {
    res.render('login', {msg: msg})
})

//POST URL
router.post('/register', async (req, res) => {
    const user = await db.getuser(req.body.username)
    const encryptedpwd = await bcrypt.hash(req.body.password, 10)
    if (user.length > 0 ){
        res.redirect('./register')
        msg = "username already exists"
    }
    
    else if (req.body.password != req.body.Cpassword){
            res.redirect('./register')
            msg = "User already exist."
        }
    else {
        const result = await db.createUser(req.body.username, req.body.Fname, req.body.Lname, req.body.email, encryptedpwd)
        res.redirect('./login')
        msg = ""
    }
    
})

router.post('/login', async (req, res) => {
    const user = await db.getuser(req.body.username)
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
