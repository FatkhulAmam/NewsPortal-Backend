const route = require('express').Router();
const {
  createNews, getNews, getNewsById, updateNews, deleteNews, getNewsByUser,
} = require('../controllers/news');

// import helper
const uploadHelper = require('../helpers/upload');

route.post('/', uploadHelper.single('pictures'), createNews);
route.get('/', getNews);
route.get('/:id', getNewsById);
route.get('/all/user', getNewsByUser);
route.patch('/:id', uploadHelper.single('pictures'), updateNews);
route.delete('/:id', deleteNews);

module.exports = route;
