import { NextResponse } from "next/server";
import pool from "@/lib/db/connection";

// get characters for a project
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const projectId = url.searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { message: "project id required" },
        { status: 400 },
      );
    }

    const [rows] = await pool.query(
      "SELECT * FROM characters WHERE project_id = ? ORDER BY created_at DESC",
      [projectId],
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "error getting characters" },
      { status: 500 },
    );
  }
}

// create character
export async function POST(req) {
  try {
    const body = await req.json();

    const projectId = body.project_id;
    const name = body.name;
    const role = body.role;
    const description = body.description;
    const image_path = body.image_path || null;

    if (!projectId) {
      return NextResponse.json(
        { message: "project id required" },
        { status: 400 },
      );
    }

    if (!name || name.trim() === "") {
      return NextResponse.json({ message: "name required" }, { status: 400 });
    }

    const [result] = await pool.query(
      "INSERT INTO characters (project_id, name, description, role, image_path) VALUES (?, ?, ?, ?, ?)",
      [projectId, name, description, role, image_path],
    );

    const newCharacter = {
      character_id: result.insertId,
      project_id: projectId,
      name: name,
      role: role,
      description: description,
      image_path: image_path,
    };

    return NextResponse.json(newCharacter);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "error creating character" },
      { status: 500 },
    );
  }
}
