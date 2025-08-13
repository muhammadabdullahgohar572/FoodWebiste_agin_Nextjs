import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // Check if environment variables are accessible
    const dbUrl = process.env.Db_Url;
    const jwtSecret = process.env.JWT_SECRET;
    
    return NextResponse.json({
      dbUrlExists: !!dbUrl,
      jwtSecretExists: !!jwtSecret,
      // Don't expose actual values in production
      dbUrlFirstChars: dbUrl ? dbUrl.substring(0, 10) + '...' : null
    });
  } catch (error) {
    console.error("Environment test error:", error);
    return NextResponse.json(
      { message: error.message || "Error checking environment" },
      { status: 500 }
    );
  }
};