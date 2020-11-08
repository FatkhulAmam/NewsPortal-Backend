const { news } = require('../models')
const paging = require('../helpers/pagination')
const responseStandart = require('../helpers/response')
const bcrypt = require('bcryptjs')
const joi = require('joi')

module.exports = {
    createNews: async (req, res) => {
        const schema = joi.object({
            author: joi.string().required(),
            headline: joi.string().required(),
            category: joi.string().required(),
            deskripsi: joi.string().required()
        })
        let { value: results, error } = schema.validate(req.body)
        const { author, headline, category, deskripsi } = results
        if (!error) {
            const dataUser = {
                author: author,
                headline: headline,
                category: category,
                deskripsi: deskripsi
            }
            await news.create(dataUser)
            return responseStandart(res, 'create hot news success', {})
        } else {
            return responseStandart(res, 'error', {}, 401, false)
        }
    },
    getNews: async (req, res) => {
        const count = await news.count()
        const page = paging(req, count)
        const { offset, pageInfo } = page
        const { limitData: limit } = pageInfo
        const result = await news.findAll({limit, offset})
        return responseStandart(res, 'List all category detail', { result, pageInfo })
    },
    getNewsById: async (req, res) => {
        const {id} = req.params
        const results = await news.findByPk(id)
        if (results) {
            return responseStandart(res, `news id ${id}`, {results})
        } else {
            return responseStandart(res, `news ${id} not found`, {}, 401, false)
        }
    },
    updateNews: async (req, res) => {
        const {id} = req.params
        const {category_name} = req.body
        const results = await news.findByPk(id)
        if (results) {
            const data = {category_name}
            await results.update(data)
            return responseStandart(res, `update hottes successfully`, {results})
        } else {
            return responseStandart(res, `cannot update news`, {}, 401, false)
        }
    },
    deleteNews: async (req, res) => {
        const {id} = req.params
        const results = await news.findByPk(id)
        if (results) {
            await results.destroy()
            return responseStandart(res, `News is HOAX`, {})
        } else {
            return responseStandart(res, `News not found`, {}, 401, false)
        }
    }
}