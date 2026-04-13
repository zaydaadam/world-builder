import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db/connection";

export async function POST(request) {
  try {
    // get data from frontend
    const body = await request.json();

    const username = body.username?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;
    const confirmPassword = body.confirmPassword;
    const role = body.role;
    // check if required fields are missing
    if (!username || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "Username, email, and password are required." },
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 },
      );
    }

    const [existingUsers] = await pool.query(
      "SELECT user_id FROM users WHERE email = ?",
      [email],
    );

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }
    // hash password before saving
    const passwordHash = await bcrypt.hash(password, 10);
    // set default role
    const userRole = role === "reader" ? "reader" : "writer";
    // insert new user into database
    const [result] = await pool.query(
      `INSERT INTO users (username, email, password_hash, role)
       VALUES (?, ?, ?, ?)`,
      [username, email, passwordHash, userRole],
    );
    // return success response
    return NextResponse.json(
      {
        message: "User registered successfully.",
        userId: result.insertId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
