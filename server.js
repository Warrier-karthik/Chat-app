const express = require("express")
const app = express()
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const requestRouter = require('./routes/request')
const session = require('express-session')
const layout = require('express-ejs-layouts')
app.use(session({
    secret: "messi@10",
    resave: false,
    saveUninitialized: false
}))

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isAuthenticated;
    res.locals.name = req.session.name
    next();
})
app.use(layout)
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views')

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/request', requestRouter)
app.listen(3000, (error) => {
    if (error) throw error
    console.log("ready")
})