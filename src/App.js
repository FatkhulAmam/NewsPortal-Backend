const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const {APP_PORT} = process.env

app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(cors())

//import route 
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const categoryRoute = require('./routes/category')
const newsRoute = require('./routes/news')

app.use('/user', userRoute)
app.use('/auth', authRoute)
app.use('/category', categoryRoute)
app.use('/news', newsRoute)

app.get('/', (req, res) => {
    res.send({
        success: true,
        message: 'backend running well'
    })
})

app.listen(APP_PORT, ()=>{
    console.log(`Running on port ${APP_PORT}`)
})