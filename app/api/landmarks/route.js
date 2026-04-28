import { NextResponse } from "next/server";
import pool from "@/lib/db/connection";

// get markers for a map
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const mapId = url.searchParams.get("mapId");

    if (!mapId) {
      return NextResponse.json({ message: "map id required" }, { status: 400 });
    }

    const [rows] = await pool.query(
      "SELECT * FROM landmarks WHERE map_id = ?",
      [mapId],
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "error getting markers" },
      { status: 500 },
    );
  }
}

// create marker
export async function POST(req) {
  try {
    const body = await req.json();

    const mapId = body.map_id;
    const name = body.name;
    const description = body.description;
    const x = body.x;
    const y = body.y;

    if (!mapId) {
      return NextResponse.json({ message: "map id required" }, { status: 400 });
    }

    if (!name || !name.trim()) {
      return NextResponse.json({ message: "name required" }, { status: 400 });
    }

    const [result] = await pool.query(
      "INSERT INTO landmarks (map_id, name, description, x_coordinate, y_coordinate) VALUES (?, ?, ?, ?, ?)",
      [mapId, name, description, x, y],
    );

    const newMarker = {
      landmark_id: result.insertId,
      map_id: mapId,
      name: name,
      description: description,
      x_coordinate: x,
      y_coordinate: y,
    };

    return NextResponse.json(newMarker);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "error creating marker" },
      { status: 500 },
    );
  }
}
