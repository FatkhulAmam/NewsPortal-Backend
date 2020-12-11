const route = require('express').Router();
const { loginUser, registrasiUser, updatePassword } = require('../controllers/auth');

route.post('/login', loginUser);
route.post('/register', registrasiUser);
route.patch('/password/change', updatePassword);

module.exports = route;
