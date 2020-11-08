const route = require('express').Router()
const {createNews, getNews, getNewsById, updateNews, deleteNews} = require('../controllers/news')

route.post('/', createNews)
route.get('/', getNews)
route.get('/:id', getNewsById)
route.patch('/:id', updateNews)
route.delete('/:id', deleteNews)

module.exports = route
