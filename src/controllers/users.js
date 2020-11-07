const {user} = require('../models')
const responseStandart = require('../helpers/response')
const bcrypt = require('bcryptjs')

module.exports = {
    createUser: async (req, res) => {
        let {name, email, password} = req.body
        password = await bcrypt.hash(password, await bcrypt.genSalt())
        const data = { name, email, password }
        const results = await user.create(data)
        return responseStandart(res, 'user created succesfull', {results})
    },
    getUser: async (req, res) => {
        const results = await user.findAll({
            limit : 2,
            offset: 1,
            attributes: {
                exclude: ['password']
            }
        })
        return responseStandart(res, 'List of All Users', {results})
    }
}