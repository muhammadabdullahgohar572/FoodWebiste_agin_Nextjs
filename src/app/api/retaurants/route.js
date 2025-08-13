import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Restaurant from "@/app/lib/restaurantsModel";
import { ConnectionDb } from "@/app/lib/Db";

export const POST = async (req) => {
  try {
    await ConnectionDb();

    const body = await req.json();
    const { 
      email, 
      password, 
      restaurantName, 
      city, 
      address, 
      contactNo 
    } = body;

    if (!email || !password || !restaurantName || !city || !address || !contactNo) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if email exists
    const existingRestaurant = await Restaurant.findOne({ email });
    if (existingRestaurant) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new restaurant
    const newRestaurant = new Restaurant({
      restaurantName,
      email,
      password: hashedPassword,
      city,
      address,
      contactNo,
    });

    // Save to database
    const savedRestaurant = await newRestaurant.save();

    return NextResponse.json(
      {
        success: true,
        data: {
          id: savedRestaurant._id,
          restaurantName: savedRestaurant.restaurantName,
          email: savedRestaurant.email,
          city: savedRestaurant.city,
          address: savedRestaurant.address,
          contactNo: savedRestaurant.contactNo,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
};