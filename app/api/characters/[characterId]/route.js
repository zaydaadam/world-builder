import { NextResponse } from "next/server";
import pool from "@/lib/db/connection";

// delete character
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const characterId = parts[parts.length - 1];

    if (!characterId) {
      return NextResponse.json(
        { message: "character id required" },
        { status: 400 },
      );
    }

    const [result] = await pool.query(
      "DELETE FROM characters WHERE character_id = ?",
      [characterId],
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

// update character
export async function PUT(req) {
  try {
    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const characterId = parts[parts.length - 1];

    if (!characterId) {
      return NextResponse.json(
        { message: "character id required" },
        { status: 400 },
      );
    }

    const body = await req.json();

    const name = body.name;
    const role = body.role;
    const description = body.description;
    const image_path = body.image_path || null;

    if (!name || name.trim() === "") {
      return NextResponse.json({ message: "name required" }, { status: 400 });
    }

    const [result] = await pool.query(
      "UPDATE characters SET name = ?, role = ?, description = ?, image_path = ? WHERE character_id = ?",
      [name, role, description, image_path, characterId],
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "not found" }, { status: 404 });
    }

    return NextResponse.json({
      character_id: Number(characterId),
      name,
      role,
      description,
      image_path,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "error updating character" },
      { status: 500 },
    );
  }
}
