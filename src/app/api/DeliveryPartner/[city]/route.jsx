import { ConnectionDb } from "@/app/lib/Db";
import DeliveryPartnerModel from "@/app/lib/Delivery";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await ConnectionDb();
    const city = params.city;

    let filert = { city: { $regex: new RegExp(city, "i") } };
    const deliveryPartner = await DeliveryPartnerModel.find(filert);
    if (deliveryPartner.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No delivery partner found in this city",
      });
    }
    return NextResponse.json({
      success: true,
      message: "Delivery partner found in this city",
      data: deliveryPartner,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
