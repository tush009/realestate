import pkg from 'bcryptjs'
import Broker from '../models/brokerModel.js'
import { errorResponse, successResponse } from '../utils/helper.js'
import { responseType } from '../utils/responseType.js'
import Property from '../models/propertyModel.js'

const { hash } = pkg

export const addBroker = async (req, res) => {
  try {
    const { firstName, lastName, username, email, contactNo, password } = req.body
    const broker = await Broker.findOne({ email })
    if (broker) {
      return errorResponse(res, 500, 'Email Already Exist')
    }
    const encryptedPassword = await hash(password, 10)
    const newBroker = await Broker.create({
      firstName,
      lastName,
      username,
      email,
      contactNo,
      password: encryptedPassword,
    })
    newBroker.password = ''
    return successResponse(res, 200, responseType[1], newBroker)
  } catch (error) {
    console.error('Error adding landlord:', error)
    return errorResponse(res, 500, error)
  }
}

export const getBrokerList = async (req, res) => {
  try {
    const brokerList = await Broker.find().select(
      'firstName lastName contactNo email username properties createdAt updatedAt',
    )
    return successResponse(res, 200, responseType[4], brokerList)
  } catch (error) {
    console.error('Error getting broker list:', error)
    return errorResponse(res, 500, error)
  }
}

export const addPropertyDetails = async (req, res) => {
  try {
    const { brokerId, properties } = req.body
    const broker = await Broker.findById(brokerId)

    if (!broker) {
      return errorResponse(res, 404, 'Broker not found')
    }

    const propertyObjects = await Property.find({ _id: { $in: properties } })
    const uniquePropertyIds = new Set([...broker.properties, ...propertyObjects.map((property) => property._id)])
    broker.properties = [...uniquePropertyIds]
    await broker.save()

    for (const propertyObject of propertyObjects) {
      if (!propertyObject.brokers.includes(broker._id)) {
        propertyObject.brokers.push(broker._id)
        await propertyObject.save()
      }
    }
    broker.password = ''
    return successResponse(res, 200, responseType[5], broker)
  } catch (error) {
    console.error('Error getting broker list:', error)
    return errorResponse(res, 500, error)
  }
}

export const getBrokerById = async (req, res) => {
  try {
    const brokerId = req.params.brokerId
    const broker = await Broker.findById(brokerId).select(
      'firstName lastName contactNo email username properties createdAt updatedAt',
    )
    return successResponse(res, 200, responseType[4], broker)
  } catch (error) {
    console.error('Error getting broker:', error)
    return errorResponse(res, 500, error)
  }
}

export const updateBrokerDetail = async (req, res) => {
  try {
    const brokerId = req.params.brokerId
    const { firstName, lastName, contactNo, email, username } = req.body

    const broker = await Broker.findById(brokerId)

    if (!broker) {
      return errorResponse(res, 404, 'broker not found')
    }

    broker.firstName = firstName
    broker.lastName = lastName
    broker.contactNo = contactNo
    broker.email = email
    broker.username = username

    const updatedBroker = await broker.save()
    updatedBroker.password = ''
    return successResponse(res, 200, responseType[5], updatedBroker)
  } catch (error) {
    console.error('Error updating broker:', error)
    return errorResponse(res, 500, error)
  }
}

export const deleteBroker = async (req, res) => {
  try {
    const brokerId = req.params.brokerId
    const propertiesToUpdate = await Property.find({ brokers: brokerId })

    for (const propertyToUpdate of propertiesToUpdate) {
      const brokerIndex = propertyToUpdate.brokers.indexOf(brokerId)
      if (brokerIndex !== -1) {
        propertyToUpdate.brokers.splice(brokerIndex, 1)
        await propertyToUpdate.save()
      }
    }
    await Broker.findByIdAndDelete(brokerId)

    return successResponse(res, 200, responseType[6])
  } catch (error) {
    console.error('Error deleting broker:', error)
    return errorResponse(res, 500, error)
  }
}
