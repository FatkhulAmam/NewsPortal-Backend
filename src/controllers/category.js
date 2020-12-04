/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
const joi = require('joi');
const { where, Op, order } = require('sequelize');
const { category } = require('../models');
const responseStandart = require('../helpers/response');
const paging = require('../helpers/pagination');

module.exports = {
  createCategory: async (req, res) => {
    const schema = joi.object({
      category_name: joi.string().required(),
    });
    const { value: results, error } = schema.validate(req.body);
    if (!error) {
      const dataUser = {
        category_name: results.category_name,
      };
      await category.create(dataUser);
      return responseStandart(res, 'create category success', {});
    }
    return responseStandart(res, 'error', {}, 401, false);
  },
  getCategories: async (req, res) => {
    const { search, sort } = req.query;
    let sortBy = '';
    let sortFrom = '';
    if (typeof sort === 'object') {
      sortBy = Object.keys(sort)[0];
      sortFrom = Object.values(sort)[0];
    } else {
      sortBy = 'id';
      sortFrom = sort || 'asc';
    }
    let searchKey = '';
    let searchValue = '';
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0];
      searchValue = Object.values(search)[0];
    } else {
      searchKey = 'category_name';
      searchValue = search || '';
    }
    const count = await category.count();
    const page = paging(req, count);
    const { offset, pageInfo } = page;
    const { limitData: limit } = pageInfo;
    const result = await category.findAll(
      {
        where: {
          [searchKey]: {
            [Op.substring]: `${searchValue}`,
          },
        },
        order: [
          [`${sortBy}`, `${sortFrom}`],
        ],
      },
    );
    return responseStandart(res, 'List all category detail', { result, pageInfo });
  },
  getCategory: async (req, res) => {
    const { id } = req.params;
    const results = await category.findByPk(id);
    if (results) {
      return responseStandart(res, `category id ${id}`, { results });
    }
    return responseStandart(res, `category ${id} not found`, {}, 401, false);
  },
  updateCategory: async (req, res) => {
    const { id } = req.params;
    const { category_name } = req.body;
    const results = await category.findByPk(id);
    if (results) {
      const data = { category_name };
      console.log(category_name);
      await results.update(data);
      return responseStandart(res, 'update successfully', { results });
    }
    return responseStandart(res, `cannot update category ${id}`, {}, 401, false);
  },
  deleteCategory: async (req, res) => {
    const { id } = req.params;
    const results = await category.findByPk(id);
    if (results) {
      await results.destroy();
      return responseStandart(res, `delete category ${id} successfully`, {});
    }
    return responseStandart(res, `category ${id} not found`, {}, 401, false);
  },
};
