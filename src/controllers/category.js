const { category } = require('../models')
const responseStandart = require('../helpers/response')
const bcrypt = require('bcryptjs')
const joi = require('joi')

module.exports = {
    createCategory: async (req, res) => {
        const schema = joi.object({
            category_name: joi.string().required(),
        })
        let { value: results, error } = schema.validate(req.body)
        if (!error) {
            const dataUser = {
                category_name: results.category_name,
            }
            await category.create(dataUser)
            return responseStandart(res, 'create category success', {})
        } else {
            return responseStandart(res, 'error', {}, 401, false)
        }
    },
    getCategories: async (req, res) => {
        const results = await category.findAll({
            limit: 2,
            offset: 1
        })
        return responseStandart(res, 'List of All category', { results })
    },
    getCategory: async (req, res) => {
        const {id} = req.params
        const results = await user.findByPk(id)
        if (results) {
            return responseStandart(res, `category id ${id}`, {results})
        } else {
            return responseStandart(res, `category ${id} not found`, {}, 401, false)
        }
    },
    updateCategory: async (req, res) => {
        const {id} = req.params
        const {category_name} = req.body
        const results = await category.findByPk(id)
        if (results) {
            const data = {category_name}
            await results.update(data)
            return responseStandart(res, `update successfully`, {results})
        } else {
            return responseStandart(res, `cannot update category ${id}`, {}, 401, false)
        }
    },
    deleteCategory: async (req, res) => {
        const {id} = req.params
        const results = await category.findByPk(id)
        if (results) {
            await results.destroy()
            return responseStandart(res, `delete category ${id} successfully`, {})
        } else {
            return responseStandart(res, `category ${id} not found`, {}, 401, false)
        }
    }
}