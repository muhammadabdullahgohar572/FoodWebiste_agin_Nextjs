import { ConnectionDb } from "@/app/lib/Db";
import Restaurant from "@/app/lib/restaurantsModel";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await ConnectionDb();

    let result = await Restaurant.find();

    // Capitalize first letter of each city
    result = result.map((item) => 
      item.city.charAt(0).toUpperCase() + item.city.slice(1)
    );

    // Remove duplicates
    result = [...new Set(result)];

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};

