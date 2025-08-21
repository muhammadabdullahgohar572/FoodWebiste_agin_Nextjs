import mongoose from "mongoose";

const DeliveryPartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DeliveryPartnerModel = mongoose.models.DeliveryPartner || mongoose.model("DeliveryPartner", DeliveryPartnerSchema);

export default DeliveryPartnerModel;
