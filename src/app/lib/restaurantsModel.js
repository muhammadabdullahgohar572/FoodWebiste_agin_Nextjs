import mongoose from "mongoose";

const RestaurantsSchema = new mongoose.Schema({
  restaurantName: { required: true, type: String },
  email: { required: true, type: String },
  password: { required: true, type: String },
  city: { required: true, type: String },
  address: { required: true, type: String },
  contactNo: { required: true, type: String },
});

// Check if model already exists before defining it
export const restaurantsmodels = 
  mongoose.models.RestaurantsModel || mongoose.model("RestaurantsModel", RestaurantsSchema);