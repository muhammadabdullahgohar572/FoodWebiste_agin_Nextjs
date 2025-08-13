import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Track connection status to avoid multiple connection attempts
let isConnected = false;

export const ConnectDb = async () => {
  try {
    // If already connected, return the existing connection
    if (isConnected) {
      console.log("Using existing database connection");
      return mongoose.connection;
    }

    const Db = process.env.Db_Url;
    if (!Db) {
      console.error("Database URL is missing in environment variables");
      throw new Error("Database URL is missing");
    }

    const connection = await mongoose.connect(Db, {
      dbName: "restaurantsData",
      bufferCommands: false,
      // Timeout after 10s instead of 30s default
      serverSelectionTimeoutMS: 10000,
    });

    isConnected = true;
    console.log("Database connected successfully");
    return connection;
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Failed to connect to database");
  }
};
