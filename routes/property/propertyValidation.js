import Joi from 'joi'
import { errorResponse } from '../../utils/helper.js'

export const propertySchema = Joi.object({
  location: Joi.string().required(),
  type: Joi.string().required(),
  area: Joi.string().required(),
  landlord_id: Joi.string().required(),
  building: Joi.object({
    buildingName: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    State: Joi.string().required(),
  }),
  floors: Joi.array().items(
    Joi.object({
      floorNumber: Joi.number().required(),
      units: Joi.array().items(
        Joi.object({
          unitNumber: Joi.string().required(),
          unitName: Joi.string().required(),
        }),
      ),
    }),
  ),
})

export const validateProperty = (req, res, next) => {
  const { error, value } = propertySchema.validate(req.body)

  if (error) {
    return errorResponse(res, 400, error.details[0].message)
  }

  req.validateProperty = value
  next()
}
