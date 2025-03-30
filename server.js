const express = require("express")
const app = express()
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const requestRouter = require('./routes/request')
const messageRouter = require('./routes/message')
const initializesocket = require('./socket')
const session = require('express-session')
const layout = require('express-ejs-layouts')
const http = require('http')


const server = http.createServer(app)
const io = initializesocket(server)
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

app.use(express.json())
app.set("socket.io", io)
app.set("onlineUsers", {})
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/request', requestRouter)
app.use('/messages', messageRouter)

server.listen(3000, (error) => {
    if (error) throw error
    console.log("ready")
})