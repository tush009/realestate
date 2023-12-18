import jwtpackage from 'jsonwebtoken'
import pkg from 'bcryptjs'
import { errorResponse, successResponse } from '../utils/helper.js'
import Landlord from '../models/landlordModel.js'
import { responseType } from '../utils/responseType.js'
import Broker from '../models/brokerModel.js'

const { compare } = pkg
const { sign } = jwtpackage

export const login = async (req, res) => {
  try {
    const { username, password, role } = req.body
    if (role === 'landlord') {
      const landlord = await Landlord.findOne({ username })
      if (landlord && (await compare(password, landlord.password))) {
        const token = sign({ userid: landlord._id, user_email: landlord.email, role }, process.env.APP_SECRET_KEY, {
          expiresIn: '10h',
        })
        landlord.password = ''
        let user = { token }
        return successResponse(res, 200, responseType[3], user)
      }
    }
    if (role === 'broker') {
      const broker = await Broker.findOne({ username })
      if (broker && (await compare(password, broker.password))) {
        const token = sign({ userid: broker._id, user_email: broker.email, role }, process.env.APP_SECRET_KEY, {
          expiresIn: '10h',
        })
        broker.password = ''
        let user = { token }
        return successResponse(res, 200, responseType[3], user)
      }
    }
  } catch (error) {
    console.error('Error deleting property:', error)
    return errorResponse(res, 500, error)
  }
}
