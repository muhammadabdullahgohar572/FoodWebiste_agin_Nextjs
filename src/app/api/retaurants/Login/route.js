import Restaurant from "@/app/lib/restaurantsModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ConnectionDb } from "@/app/lib/Db";

export const POST = async (req) => {
  try {
    await ConnectionDb();
    const { email, password } = await req.json();

    if (!email?.trim() || !password?.trim()) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const data = await Restaurant.findOne({ email });
    if (!data) {
      return NextResponse.json({ error: "Email not found" }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Password does not match" }, { status: 400 });
    }

    return NextResponse.json({ message: "Login success", data }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};

