import { Router } from 'express'
import {
  addProperty,
  deletePropertyById,
  getPropertyById,
  getPropertyList,
  updateProperty,
} from '../../controller/propertyController.js'
import { validateProperty } from './propertyValidation.js'
import { verifyToken } from '../../middleware/auth.js'
export const propertyRoutes = Router()

propertyRoutes.post('/add-property', verifyToken, validateProperty, addProperty)
propertyRoutes.get('/get-property-list', getPropertyList)
propertyRoutes.get('/get-property/:propertyId', getPropertyById)
propertyRoutes.put('/update-property/:propertyId', verifyToken, validateProperty, updateProperty)
propertyRoutes.delete('/delete-property/:propertyId', verifyToken, deletePropertyById)
