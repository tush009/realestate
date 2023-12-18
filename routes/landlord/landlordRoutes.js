import { Router } from 'express'
import {
  addLandlord,
  deleteLandlordById,
  getLandlordById,
  getLandlordList,
  updateLandlordDetail,
} from '../../controller/landlordController.js'
import { validateLandlord, validateUpdateLandlord } from './landlordValidation.js'
import { verifyToken } from '../../middleware/auth.js'

export const landLordRouter = Router()

landLordRouter.post('/add-landlord', validateLandlord, addLandlord)
landLordRouter.get('/get-landlord-list', getLandlordList)
landLordRouter.get('/get-landlord/:landlordId', getLandlordById)
landLordRouter.put('/update-landlord/:landlordId', verifyToken, validateUpdateLandlord, updateLandlordDetail)
landLordRouter.delete('/delete-landlord/:landlordId', verifyToken, deleteLandlordById)
