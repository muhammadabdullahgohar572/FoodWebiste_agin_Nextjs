import { ConnectionDb } from "@/app/lib/Db";
import FoodModels from "@/app/lib/FoodModel";
import Restaurant from "@/app/lib/restaurantsModel";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await ConnectionDb();
    const id = params.id;
    
    // Find restaurant by its _id
    const restaurant = await Restaurant.findById(id);
    
    // Find food items that belong to this restaurant (using res_id)
    const foodItems = await FoodModels.find({ res_id: id });

    return NextResponse.json({
      message: "success",
      deatils: restaurant ? [restaurant] : [], // Return as array to match your frontend expectation
      food: foodItems,
    });
  } catch (error) {
    return NextResponse.json({
      message: "error",
      error: error.message,
    });
  }
};