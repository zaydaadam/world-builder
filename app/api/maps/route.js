import { NextResponse } from "next/server";
import pool from "@/lib/db/connection";

// get map for one project
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
      "SELECT * FROM maps WHERE project_id = ? LIMIT 1",
      [projectId],
    );

    return NextResponse.json(rows[0] || null);
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "error getting map" }, { status: 500 });
  }
}

// create map
export async function POST(req) {
  try {
    const body = await req.json();

    const projectId = body.project_id;
    const mapName = body.map_name || "Main Map";
    const imagePath = body.image_path || null;

    if (!projectId) {
      return NextResponse.json(
        { message: "project id required" },
        { status: 400 },
      );
    }

    const [result] = await pool.query(
      "INSERT INTO maps (project_id, map_name, image_path) VALUES (?, ?, ?)",
      [projectId, mapName, imagePath],
    );

    const newMap = {
      map_id: result.insertId,
      project_id: projectId,
      map_name: mapName,
      image_path: imagePath,
    };

    return NextResponse.json(newMap);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "error creating map" },
      { status: 500 },
    );
  }
}
