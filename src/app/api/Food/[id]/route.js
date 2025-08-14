import { ConnectionDb } from "@/app/lib/Db";
import FoodModels from "@/app/lib/FoodModel";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await ConnectionDb();
    const res_id = params.id; 
    const dataget = await FoodModels.find({ res_id: res_id });
    return NextResponse.json({
      message: "success",
      data: dataget,
    });
  } catch (error) {
    return NextResponse.json({
      message: "error",
      error: error.message,
    });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await ConnectionDb();
    const id = params.id; 
    const dataget = await FoodModels.deleteOne({ _id: id });
    return NextResponse.json({
      message: "success",
      data: dataget,
    });
  } catch (error) {
    return NextResponse.json({
      message: "error",
      error: error.message,
    });
  }
};

