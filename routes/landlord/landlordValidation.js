import Joi from 'joi'
import { errorResponse } from '../../utils/helper.js'

export const landLordSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  password: Joi.string().min(8).required(),
  confirm_password: Joi.string().min(8).valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
  }),
})

export const validateLandlord = (req, res, next) => {
  const { error, value } = landLordSchema.validate(req.body)

  if (error) {
    return errorResponse(res, 400, error.details[0].message)
  }

  req.validatedLandlord = value
  next()
}

export const updateLandLordSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
})

export const validateUpdateLandlord = (req, res, next) => {
  const { error, value } = updateLandLordSchema.validate(req.body)

  if (error) {
    return errorResponse(res, 400, error.details[0].message)
  }

  req.validatedLandlord = value
  next()
}
