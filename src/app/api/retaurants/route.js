import { ConnectDb } from "@/app/lib/Db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { restaurantsmodels } from "@/app/lib/restaurantsModel";

export const POST = async (req, res) => {
  try {
    // Ensure database is connected before proceeding
    await ConnectDb();

    const { restaurantName, email, password, city, address, contactNo } = await req.json();

    // Validation
    if (!restaurantName || !email || !password || !city || !address || !contactNo) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if restaurant already exists
    const existingRestaurant = await restaurantsmodels.findOne({ email });
    if (existingRestaurant) {
      return NextResponse.json(
        { message: "Restaurant already exists with this email" },
        { status: 409 }
      );
    }

    // Rest of your code remains the same...
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newRestaurant = new restaurantsmodels({
      restaurantName,
      email,
      password: hashedPassword,
      city,
      address,
      contactNo,
    });

    const savedRestaurant = await newRestaurant.save();

    const token = jwt.sign(
      { id: savedRestaurant._id, email: savedRestaurant.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return NextResponse.json(
      { 
        token,
        restaurant: {
          id: savedRestaurant._id,
          name: savedRestaurant.restaurantName,
          email: savedRestaurant.email
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
};