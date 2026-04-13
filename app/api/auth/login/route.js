import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db/connection";

export async function POST(request) {
  try {
    const body = await request.json();

    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and Password are required." },
        { status: 400 },
      );
    }

    const [users] = await pool.query(
      "SELECT user_id, username, email, password_hash, role FROM users WHERE email = ?",
      [email],
    );

    if (users.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    const user = users[0];

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    return NextResponse.json(
      {
        message: "Login successful.",
        user: {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
