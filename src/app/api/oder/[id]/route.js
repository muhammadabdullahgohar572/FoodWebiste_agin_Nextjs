
import { ConnectionDb } from "@/app/lib/Db";
import OderModels from "@/app/lib/OderModel";
import Restaurant from "@/app/lib/restaurantsModel";
import { NextResponse } from "next/server";


export const GET = async (request, { params }) => {
  try {
    await ConnectionDb();
    const id = params.id;
    let result = await OderModels.find({ DeliveryBoye_Id: id });

    let res_result = await Promise.all(
      result.map(async (item) => {
        let infodata = {};
        infodata.data = await Restaurant.findOne({ _id: item.res_id });
        infodata.amount = item.amount;
        infodata.address = item.address;
        infodata.name = item.name;
        infodata.email = item.email;
        infodata.phone = item.phone;

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
