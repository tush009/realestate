import { mongoose, Schema } from 'mongoose'

const buildingSchema = new Schema({
  buildingName: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    require: true,
    trim: true,
  },
  city: {
    type: String,
    require: true,
    trim: true,
  },
  State: {
    type: String,
    require: true,
    trim: true,
  },
})

const unitSchema = new Schema({
  unitNumber: {
    type: String,
    trim: true,
  },
  unitName: {
    type: String,
    trim: true,
  },
})

const floorSchema = new Schema({
  floorNumber: {
    type: Number,
  },
  units: [unitSchema],
})

const propertySchema = new Schema(
  {
    location: {
      type: String,
      require: true,
      trim: true,
    },
    type: {
      type: String,
      require: true,
      trim: true,
    },
    area: {
      type: String,
      require: true,
      trim: true,
    },

    landlord_id: {
      type: Schema.Types.ObjectId,
      trim: true,
      ref: 'Landlord',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    brokers: [
      {
        type: Schema.Types.ObjectId,
        trim: true,
        ref: 'Broker',
      },
    ],
    floors: [floorSchema],
    building: buildingSchema,
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const Property = mongoose.model('Property', propertySchema)

export default Property
