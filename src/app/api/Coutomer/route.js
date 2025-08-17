import { ConnectionDb } from "@/app/lib/Db";
import Restaurant from "@/app/lib/restaurantsModel";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await ConnectionDb();
    let queryParams = req.nextUrl.searchParams;
// http://localhost:3000/api/Coutomer?location=karachi
    let filter = {};
    if (queryParams.get("location")) {
     let city = queryParams.get("location");
      filter = { city: { $regex: new RegExp(city, "i") } };
    } else if (queryParams.get("restaurantName")) {
      let restaurantName = queryParams.get("restaurantName");
      filter = { restaurantName: { $regex: new RegExp(restaurantName, "i") } };
    }
    const find = await Restaurant.find(filter);
    return NextResponse.json({
      message: "success",
      find,
    });
  } catch (error) {
    return NextResponse.json({
      message: "error",
      error: error.message,
    });
  }
};
