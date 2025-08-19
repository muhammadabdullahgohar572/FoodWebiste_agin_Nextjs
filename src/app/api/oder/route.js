import { ConnectionDb } from "@/app/lib/Db";
import OderModels from "@/app/lib/OderModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await ConnectionDb();
    
    const { res_id, User_Id, FoodItems, amount, status, DeliveryBoye_Id } = await request.json();
    
    // Validate required fields
    if (!res_id || !User_Id || !FoodItems || !amount) {
      return NextResponse.json({
        message: "Missing required fields",
        success: false,
      }, { status: 400 });
    }
    
    const newOrder = new OderModels({
      res_id,
      User_Id,
      FoodItems, // No need to stringify - it's now an array of objects
      amount,
      status: status || "pending",
      DeliveryBoye_Id: DeliveryBoye_Id || null,
    });
    
    await newOrder.save();
    
    return NextResponse.json({
      message: "Order placed successfully",
      success: true,
      newOrder,
    }, { status: 201 });
  } catch (error) {
    console.error("Order placement error:", error);
    return NextResponse.json({
      message: "Error in order placement",
      success: false,
      error: error.message,
    }, { status: 500 });
  }
};