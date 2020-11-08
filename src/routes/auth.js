const route = require('express').Router()
const {loginUser} = require('../controllers/auth')
const { createUser } = require('../controllers/users')

route.post('/login', loginUser)
route.post('/register', createUser)

module.exports = route
