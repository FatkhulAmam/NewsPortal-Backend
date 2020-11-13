const route = require('express').Router()
const {createNews, getNews, getNewsById, updateNews, deleteNews} = require('../controllers/news')

//import helper
const uploadHelper = require('../helpers/upload')

//import middleware
const authMiddleware = require('../middlewares/auth')

route.post('/', uploadHelper.single('pictures'), createNews)
route.get('/', getNews)
route.get('/:id', getNewsById)
route.patch('/:id', uploadHelper.single('pictures'), updateNews)
route.delete('/:id', deleteNews)

module.exports = route
