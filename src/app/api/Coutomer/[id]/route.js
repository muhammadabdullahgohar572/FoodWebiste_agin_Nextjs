import { ConnectionDb } from "@/app/lib/Db";
import FoodModels from "@/app/lib/FoodModel";
import Restaurant from "@/app/lib/restaurantsModel";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await ConnectionDb();
    const id = params.id;
    const deatils = await Restaurant.find({ res_id: id });
    const food = await FoodModels.find({ _id: id });

    return NextResponse.json({
      message: "success",
      deatils,
      food,
    });
  } catch (error) {
    return NextResponse.json({
      message: "error",
      error: error.message,
    });
  }
};
