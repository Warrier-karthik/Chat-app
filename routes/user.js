const express = require('express');
const router = express.Router()
const db = require('../database')
const bcrypt = require('bcrypt')
//Get URL
router.get('/', (req, res) => {
    res.render('user')
})

router.get('/register', (req, res) => {
    res.render('register')
})
router.get('/login', (req, res) => {
    res.render('login')
})

//POST URL
router.post('/register', async (req, res) => {
    const encryptedpwd = await bcrypt.hash(req.body.password, 10)
    const result = await db.createUser(req.body.username, req.body.Fname, req.body.Lname, req.body.email, encryptedpwd)
    res.redirect('./login')
})
router.post('/login', async (req, res) => {
    const user = await db.getuser(req.body.username)
    if (await bcrypt.compare(req.body.password, user[0].Password))
    {
        console.log("Welcome to my site");
        res.redirect('/')
    }
    else
    {
        console.log("Wtf wrong fing password bruh....")
        res.redirect('./login')
    }
})
module.exports = router
