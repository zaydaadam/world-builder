import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db/connection";

export async function POST(req) {
  try {
    const { username, email, password, confirmPassword, role } =
      await req.json();

    const cleanUsername = username?.trim();
    const cleanEmail = email?.trim().toLowerCase();

    if (!cleanUsername || !cleanEmail || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords don’t match" },
        { status: 400 },
      );
    }

    const [rows] = await pool.query(
      "SELECT user_id FROM users WHERE email = ?",
      [cleanEmail],
    );

    if (rows.length > 0) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 },
      );
    }

    const hash = await bcrypt.hash(password, 10);

    const userRole = role === "reader" ? "reader" : "writer";

    const [result] = await pool.query(
      `INSERT INTO users (username, email, password_hash, role)
       VALUES (?, ?, ?, ?)`,
      [cleanUsername, cleanEmail, hash, userRole],
    );

    return NextResponse.json(
      {
        message: "Account created",
        userId: result.insertId,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("Register error:", err);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
