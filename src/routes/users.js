const route = require('express').Router()
const {createUser, getUser} = require('../controllers/users')

route.post('/', createUser)
route.get('/', getUser)

module.exports = route
