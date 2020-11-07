const { user } = require('../models')
const responseStandart = require('../helpers/response')
const bcrypt = require('bcryptjs')
const joi = require('joi')

module.exports = {
    createUser: async (req, res) => {
        const schema = joi.object({
            name: joi.string().required(),
            email: joi.string().required(),
            password: joi.string().required()
        })
        let { value: results, error } = schema.validate(req.body)
        if (!error) {
            const salt = bcrypt.genSaltSync(10)
            const hashedPass = bcrypt.hashSync(results.password, salt)
            const dataUser = {
                name: results.name,
                email: results.email,
                password: hashedPass
            }
            await user.create(dataUser)
            return responseStandart(res, 'create user success', {})
        } else {
            return responseStandart(res, 'error', {}, 401, false)
        }
    },
    getUsers: async (req, res) => {
        const results = await user.findAll({
            limit: 2,
            offset: 1,
            attributes: {
                exclude: ['password']
            }
        })
        return responseStandart(res, 'List of All Users', { results })
    },
    getUser: async (req, res) => {
        const {id} = req.params
        const results = await user.findByPk(id, {
            attributes: {
                exclude: ['password']
            }
        })
        if (results) {
            return responseStandart(res, `user with id ${id}`, {results})
        } else {
            return responseStandart(res, `id ${id} not found`, {}, 401, false)
        }
    },
    updateUser: async (req, res) => {
        const {id} = req.params
        const {name, birth_date, email, password} = req.body
        const results = await user.findByPk(id)
        if (results) {
            const data = {
                name, birth_date, email, password
            }
            await results.update(data)
            return responseStandart(res, `update successfully`, {results})
        } else {
            return responseStandart(res, `cannot update user ${id}`, {}, 401, false)
        }
    },
    deleteUser: async (req, res) => {
        const {id} = req.params
        const results = await user.findByPk(id)
        if (results) {
            await results.destroy()
            return responseStandart(res, `delete user id ${id} successfully`, {})
        } else {
            return responseStandart(res, `user ${id} not found`, {}, 401, false)
        }
    }
}