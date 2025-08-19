import mongoose from "mongoose";
const OderSchema = new mongoose.Schema({
  res_id: mongoose.Schema.Types.ObjectId,
  User_Id: mongoose.Schema.Types.ObjectId,
  DeliveryBoye_Id: mongoose.Schema.Types.ObjectId,
  FoodItems: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const OderModels =
  mongoose.models.OderModel || mongoose.model("OderModel", OderSchema);

export default OderModels;
