import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ConnectionDb } from "@/app/lib/Db";
import DeliveryPartnerModel from "@/app/lib/Delivery";

export const POST = async (req) => {
  try {
    await ConnectionDb();
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    const user = await DeliveryPartnerModel.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
    // Password ko remove kar dena response se
    const { password: _, ...userWithoutPassword } = user.toObject();
    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: userWithoutPassword, // frontend ko user data milega
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: process.env.NODE_ENV === "development" ? error.message : null,
      },
      { status: 500 }
    );
  }
};
