import { Router } from 'express'
import {
  addBroker,
  addPropertyDetails,
  deleteBroker,
  getBrokerById,
  getBrokerList,
  updateBrokerDetail,
} from '../../controller/brokerController.js'
import { validateLandlord, validateUpdateLandlord } from '../landlord/landlordValidation.js'
import { validateBrokerProperty } from './brokerValidation.js'
import { verifyToken } from '../../middleware/auth.js'

export const brokerRoutes = Router()

brokerRoutes.post('/add-broker', validateLandlord, addBroker)
brokerRoutes.get('/get-broker-list', getBrokerList)
brokerRoutes.post('/add-broker-property', verifyToken, validateBrokerProperty, addPropertyDetails)
brokerRoutes.get('/get-broker/:brokerId', getBrokerById)
brokerRoutes.put('/update-broker/:brokerId', verifyToken, validateUpdateLandlord, updateBrokerDetail)
brokerRoutes.delete('/delete-broker/:brokerId', verifyToken, deleteBroker)
