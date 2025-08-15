import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Restaurant from "@/app/lib/restaurantsModel";
import { ConnectionDb } from "@/app/lib/Db";

export const POST = async (req) => {
  try {
    await ConnectionDb();

    const body = await req.json();
    const { email, password, restaurantName, city, address, contactNo } = body;

    // Validation
    if (!email || !password || !restaurantName || !city || !address || !contactNo) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Validate phone number
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(contactNo)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid contact number" },
        { status: 400 }
      );
    }

    // Check if email exists
    const existingRestaurant = await Restaurant.findOne({ email });
    if (existingRestaurant) {
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 409 }
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

    // Prepare response data (exclude sensitive info)
    const responseData = {
      _id: savedRestaurant._id,
      restaurantName: savedRestaurant.restaurantName,
      email: savedRestaurant.email,
      city: savedRestaurant.city,
      address: savedRestaurant.address,
      contactNo: savedRestaurant.contactNo,
      createdAt: savedRestaurant.createdAt
    };

    return NextResponse.json(
      { 
        success: true, 
        message: "Registration successful", 
        data: responseData 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Internal server error",
        details: process.env.NODE_ENV === 'development' ? error.message : null
      },
      { status: 500 }
    );
  }
};