import Joi from 'joi'
import { errorResponse } from '../../utils/helper.js'

export const validatePropertyDetail = Joi.object({
  brokerId: Joi.string().required(),
  properties: Joi.array().items(Joi.string()),
})

export const validateBrokerProperty = (req, res, next) => {
  const { error, value } = validatePropertyDetail.validate(req.body)

  if (error) {
    return errorResponse(res, 400, error.details[0].message)
  }

  req.validateBrokerProperty = value
  next()
}
