import { ConnectionDb } from "@/app/lib/Db";
import FoodModels from "@/app/lib/FoodModel";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    await  ConnectionDb()
    const { foodname, foodprice, imagePath, fooddescription, res_id } =
      await req.json();

    const Findres = await FoodModels.find({ foodname });

    if (Findres.length > 0) {
      return NextResponse.json({
        message: "Food Item Already Exist",
        Findres,
      });
    }

    const NewAdd = new FoodModels({
      foodname,
      foodprice,
      imagePath,
      fooddescription,
      res_id,
    });
    await NewAdd.save();
    return NextResponse.json({
      message: "success",
      NewAdd,
    });
  } catch (error) {
    return NextResponse.json({
      message: "error",
      error:error.message,
    });
  }
};
