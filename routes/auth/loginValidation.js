import Joi from 'joi'
import { errorResponse } from '../../utils/helper.js'

export const validateLogin = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
})

export const validateLoginDetails = (req, res, next) => {
  const { error, value } = validateLogin.validate(req.body)

  if (error) {
    return errorResponse(res, 400, error.details[0].message)
  }

  req.validateLogin = value
  next()
}
