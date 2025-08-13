import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  foodname: {
    type: String,
    required: true,
  },
  foodprice: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  fooddescription: {
    type: String,
    required: true,
  },
  res_id: mongoose.Schema.Types.ObjectId,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FoodModels =
  mongoose.models.FoodModel || mongoose.model("FoodModel", FoodSchema);

export default FoodModels;
