import { ConnectionDb } from "@/app/lib/Db";
import FoodModels from "@/app/lib/FoodModel";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await ConnectionDb();
    const id = params.id;
    console.log(id);
    const FindData = await FoodModels.findOne({ _id: id });
    if (!FindData) {
      return NextResponse.json({
        message: "error",
        error: "Data not found",
      });
    }
    return NextResponse.json({
      message: "success",
      FindData,
    });
  } catch (error) {
    return NextResponse.json({
      message: "error",
      error: error.message,
    });
  }
};

export const PUT = async (req, { params }) => {
  try {
    await ConnectionDb();
    const { foodname, foodprice, fooddescription, imagePath } =
      await req.json();

    const id = params.id;

    console.log(id);

    const update = await FoodModels.findByIdAndUpdate(
      { _id: id },
      {
        foodname,
        foodprice,
        fooddescription,
        imagePath,
      }
    );

    if (!update) {
      return NextResponse.json({
        message: "error",
        error: "Data not found",
      });
    }

    const save = await update.save();
    return NextResponse.json({
      message: "success",
      save,
    });
  } catch (error) {
    return NextResponse.json({
      message: "error",
      error: error.message,
    });
  }
};
