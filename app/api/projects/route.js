import { NextResponse } from "next/server";
import pool from "@/lib/db/connection";

// get all projects for a user
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "userId required" }, { status: 400 });
    }

    const [rows] = await pool.query(
      "SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC",
      [userId],
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "error getting projects" },
      { status: 500 },
    );
  }
}

// create new project
export async function POST(req) {
  try {
    const body = await req.json();

    const userId = body.user_id;
    const title = body.title;
    const description = body.description;
    const image_path = body.image_path || null;

    if (!userId) {
      return NextResponse.json(
        { message: "user_id required" },
        { status: 400 },
      );
    }

    if (!title || title.trim() === "") {
      return NextResponse.json({ message: "title required" }, { status: 400 });
    }

    const [result] = await pool.query(
      "INSERT INTO projects (user_id, title, description, image_path) VALUES (?, ?, ?, ?)",
      [userId, title, description, image_path],
    );

    const newProject = {
      project_id: result.insertId,
      user_id: Number(userId),
      title,
      description,
      image_path,
    };

    return NextResponse.json(newProject);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "error creating project" },
      { status: 500 },
    );
  }
}
