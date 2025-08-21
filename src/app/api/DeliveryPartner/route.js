import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ConnectionDb } from "@/app/lib/Db";
import DeliveryPartnerModel from "@/app/lib/Delivery";

export const POST = async (req) => {
  try {
    await ConnectionDb();

    const body = await req.json();
    const { email, password, name, city, address, contactNumber } = body;

    // Validation
    if (!email || !password || !name || !city || !address || !contactNumber) {
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

    // Check if email exists
    const existingUser = await DeliveryPartnerModel.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      city,
      address,
      contactNumber,
    });

    // Save to database
    const savedUser = await newUser.save();

    // Prepare response data (exclude sensitive info)
    const responseData = {
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      city: savedUser.city,
      address: savedUser.address,
      contactNumber: savedUser.contactNumber,
      createdAt: savedUser.createdAt
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