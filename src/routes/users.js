const route = require('express').Router()
const {createUser, getUsers, getUser, updateUser, deleteUser} = require('../controllers/users')

route.post('/', createUser)
route.get('/', getUsers)
route.get('/:id', getUser)
route.patch('/:id', updateUser)
route.delete('/:id', deleteUser)

module.exports = route
