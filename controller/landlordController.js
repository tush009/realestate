import pkg from 'bcryptjs'
import Landlord from '../models/landlordModel.js'
import { successResponse, errorResponse } from '../utils/helper.js'
import { responseType } from '../utils/responseType.js'
import Property from '../models/propertyModel.js'

const { hash } = pkg
export const addLandlord = async (req, res) => {
  try {
    const { firstName, lastName, username, email, contactNo, password } = req.body
    const landlord = await Landlord.findOne({ email })
    if (landlord) {
      return errorResponse(res, 500, 'Email Already Exist')
    }
    const encryptedPassword = await hash(password, 10)
    const newLandlord = await Landlord.create({
      firstName,
      lastName,
      username,
      email,
      contactNo,
      password: encryptedPassword,
    })
    newLandlord.password = ''
    return successResponse(res, 200, responseType[1], newLandlord)
  } catch (error) {
    console.error('Error adding landlord:', error)
    return errorResponse(res, 500, error)
  }
}

export const getLandlordList = async (req, res) => {
  try {
    const landLordList = await Landlord.find().select(
      'firstName lastName contactNo email username properties createdAt updatedAt',
    )
    return successResponse(res, 200, responseType[4], landLordList)
  } catch (error) {
    console.error('Error getting landlord list:', error)
    return errorResponse(res, 500, error)
  }
}

export const getLandlordById = async (req, res) => {
  try {
    const landlordId = req.params.landlordId
    const landlord = await Landlord.findById(landlordId).select(
      'firstName lastName contactNo email username properties createdAt updatedAt',
    )
    return successResponse(res, 200, responseType[4], landlord)
  } catch (error) {
    console.error('Error getting landlord:', error)
    return errorResponse(res, 500, error)
  }
}

export const updateLandlordDetail = async (req, res) => {
  try {
    const landlordId = req.params.landlordId
    const { firstName, lastName, contactNo, email, username } = req.body

    const landlord = await Landlord.findById(landlordId)

    if (!landlord) {
      return errorResponse(res, 404, 'Landlord not found')
    }

    landlord.firstName = firstName
    landlord.lastName = lastName
    landlord.contactNo = contactNo
    landlord.email = email
    landlord.username = username

    const updatedLandlord = await landlord.save()
    updatedLandlord.password = ''
    return successResponse(res, 200, responseType[5], updatedLandlord)
  } catch (error) {
    console.error('Error updating landlord:', error)
    return errorResponse(res, 404, error)
  }
}

export const deleteLandlordById = async (req, res) => {
  try {
    const landlordId = req.params.landlordId
    await Property.findByIdAndUpdate({ landlord_id: landlordId, isDeleted: true }) // associated property will be deleted
    await Landlord.findByIdAndDelete(landlordId)
    return successResponse(res, 200, responseType[6])
  } catch (error) {
    console.error('Error deleting landlord:', error)
    return errorResponse(res, 500, error)
  }
}
