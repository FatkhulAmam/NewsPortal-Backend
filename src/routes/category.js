const route = require('express').Router();
const {
  createCategory, getCategories, getCategory, updateCategory, deleteCategory,
} = require('../controllers/category');

route.post('/', createCategory);
route.get('/', getCategories);
route.get('/:id', getCategory);
route.patch('/:id', updateCategory);
route.delete('/:id', deleteCategory);

module.exports = route;
