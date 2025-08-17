import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ConnectionDb } from "@/app/lib/Db";
import UserModel from "@/app/lib/userModel";
import { cookies } from 'next/headers';

export const POST = async (req) => {
  try {
    await ConnectionDb();

    const { email, password } = await req.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create session (using cookies)
    const sessionData = {
      userId: user._id,
      email: user.email,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
    };

    cookies().set('session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 1 day
      path: '/',
    });

    // Remove password before sending response
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return NextResponse.json(
      { 
        success: true,
        message: "Login successful",
        user: userWithoutPassword
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        details: process.env.NODE_ENV === 'development' ? error.message : null
      },
      { status: 500 }
    );
  }
};