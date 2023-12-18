import { mongoose, Schema } from 'mongoose'

const landlordSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
      trim: true,
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
    },
    contactNo: {
      type: String,
      require: true,
      trim: true,
    },
    username: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    properties: [{ type: Schema.Types.ObjectId, ref: 'Property' }],
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const Landlord = mongoose.model('Landlord', landlordSchema)

export default Landlord
