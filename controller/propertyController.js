import Property from '../models/propertyModel.js'
import Landlord from '../models/landlordModel.js'
import { successResponse, errorResponse } from '../utils/helper.js'
import { responseType } from '../utils/responseType.js'
import Broker from '../models/brokerModel.js'

export const addProperty = async (req, res) => {
  try {
    const propertyData = req.body
    const newProperty = await Property.create(propertyData)
    const landlord = await Landlord.findById(propertyData.landlord_id)

    if (!landlord) {
      return errorResponse(res, 500, 'Landlord can not be found')
    }

    landlord.properties.push(newProperty._id)

    await landlord.save()

    return successResponse(res, 200, responseType[1], newProperty)
  } catch (error) {
    console.error('Error adding property:', error)
    return errorResponse(res, 500, error)
  }
}

export const getPropertyList = async (req, res) => {
  try {
    const propertyList = await Property.find()
    return successResponse(res, 200, responseType[4], propertyList)
  } catch (error) {
    console.error('Error getting property list:', error)
    return errorResponse(res, 500, error)
  }
}

export const getPropertyById = async (req, res) => {
  try {
    const propertyId = req.params.propertyId
    const property = await Property.findById(propertyId)
    return successResponse(res, 200, responseType[4], property)
  } catch (error) {
    console.error('Error getting property list:', error)
    return errorResponse(res, 500, error)
  }
}

export const updateProperty = async (req, res) => {
  try {
    const propertyId = req.params.propertyId
    const updatedPropertyData = req.body

    const updatedProperty = await Property.findByIdAndUpdate(propertyId, updatedPropertyData, { new: true })

    if (!updatedProperty) {
      return errorResponse(res, 404, 'Property not found')
    }
    return successResponse(res, 200, responseType[5], updatedProperty)
  } catch (error) {
    console.error('Error getting property list:', error)
    return errorResponse(res, 500, error)
  }
}

export const deletePropertyById = async (req, res) => {
  try {
    const propertyId = req.params.propertyId
    const propertyToDelete = await Property.findById(propertyId)

    if (!propertyToDelete) {
      return errorResponse(res, 404, 'Property not found')
    }

    const landlordIds = propertyToDelete.landlords
    for (const landlordId of landlordIds) {
      const landlord = await Landlord.findById(landlordId)

      if (landlord) {
        const propertyIndex = landlord.properties.indexOf(propertyId)

        if (propertyIndex !== -1) {
          landlord.properties.splice(propertyIndex, 1)
          await landlord.save()
        }
      }
    }
    const brokerIds = propertyToDelete.brokers
    for (const brokerId of brokerIds) {
      const broker = await Broker.findById(brokerId)

      if (broker) {
        const propertyIndex = broker.properties.indexOf(propertyId)

        if (propertyIndex !== -1) {
          broker.properties.splice(propertyIndex, 1)
          await broker.save()
        }
      }
    }
    await Property.findByIdAndDelete(propertyId)
    return successResponse(res, 200, responseType[6])
  } catch (error) {
    console.error('Error deleting property:', error)
    return errorResponse(res, 500, error)
  }
}
