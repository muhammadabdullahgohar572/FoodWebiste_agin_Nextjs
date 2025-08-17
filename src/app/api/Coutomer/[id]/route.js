import { ConnectionDb } from "@/app/lib/Db";
import FoodModels from "@/app/lib/FoodModel";
import Restaurant from "@/app/lib/restaurantsModel";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await ConnectionDb();
    const id = params.id;
    

    const restaurant = await Restaurant.findById(id);
    
  
    const foodItems = await FoodModels.find({ res_id: id });

    return NextResponse.json({
      message: "success",
      deatils: restaurant ? [restaurant] : [], 
      food: foodItems,
    });
  } catch (error) {
    return NextResponse.json({
      message: "error",
      error: error.message,
    });
  }
};