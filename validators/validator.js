const { check } = require ("express-validator");
const { validateResult } = require("../helpers/validateHelpers")

const validateCreate = [
    check('firstName').exists().not().isEmpty(),
    check('lastName').exists().not().isEmpty(),
    check('email').exists().isEmail(),
    check('favoriteColor').exists().not().isEmpty(),
    check('birthday').exists().isDate(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate }