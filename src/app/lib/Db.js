import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const ConnectDb = () => {
  try {
    const Db = process.env.Db_Url;
    if (!Db) {
      return NextResponse.json("Db_url is Missing");
    }

  const conect=  mongoose.connect(Db, {
      dbName: "restaurantsData",
    });

    
  } catch (error) {
    console.log(error);
  }
};
