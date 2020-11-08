const { user } = require('../models')
const responseStandart = require('../helpers/response')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    loginUser: async (req, res) => {
        const data = await user.findOne({ where: { email: req.body.email } })
        if (data !== null) {
            const compared = await bcrypt.compare(req.body.password, data.password)
            if (compared === true) {
                jwt.sign({ id: data.id }, process.env.APP_KEY, (err, token) => {
                    if (err) {
                        return responseStandart(res, 'Error', { error: err.message }, 500, false)
                    } else {
                        return responseStandart(res, `Hello Readers ${data.id}`, { token })
                    }
                })
            } else {
                return responseStandart(res, 'Wrong password', {}, 400, false)
            }
        } else {
            return responseStandart(res, 'wrong email or password', {}, 400, false)
        }
    },
}