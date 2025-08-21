import { ConnectionDb } from "@/app/lib/Db";
import FoodModels from "@/app/lib/FoodModel";
import OderModels from "@/app/lib/OderModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await ConnectionDb();

    const { res_id, User_Id, FoodItems, amount, status, DeliveryBoye_Id } =
      await request.json();

    // Validate required fields
    if (!res_id || !User_Id || !FoodItems || !amount) {
      return NextResponse.json(
        {
          message: "Missing required fields",
          success: false,
        },
        { status: 400 }
      );
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

    return NextResponse.json(
      {
        message: "Order placed successfully",
        success: true,
        newOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order placement error:", error);
    return NextResponse.json(
      {
        message: "Error in order placement",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
};

export const GET = async (request) => {
  try {
    await ConnectionDb();
    const userID = request.nextUrl.searchParams.get("id");
    let result = await OderModels.find({ User_Id: userID });

    let res_result = await Promise.all(
      result.map(async (item) => {
        let infodata = {};
        infodata.data = await FoodModels.findOne({ _id: item.res_id });
        infodata.amount = item.amount;
        infodata.status = item.status;
        return infodata; // ✅ yeh return zaroori hai
      })
    );

    return NextResponse.json(
      {
        message: "Orders fetched successfully",
        success: true,
        result: res_result,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching orders",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
};
