const express = require("express")
const app = express()
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views')

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use('/', indexRouter)
app.use('/user', userRouter)
app.listen(3000, (error) => {
    if (error) throw error
    console.log("ready")
})