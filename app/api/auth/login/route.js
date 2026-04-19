import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db/connection";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const cleanEmail = email?.trim().toLowerCase();

    if (!cleanEmail || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 },
      );
    }

    const [rows] = await pool.query(
      "SELECT user_id, username, email, password_hash, role FROM users WHERE email = ?",
      [cleanEmail],
    );

    const user = rows[0];

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Login error:", err);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
