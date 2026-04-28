import { NextResponse } from "next/server";
import pool from "@/lib/db/connection";

// delete one marker
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const landmarkId = parts[parts.length - 1];

    if (!landmarkId) {
      return NextResponse.json(
        { message: "landmark id required" },
        { status: 400 },
      );
    }

    const [result] = await pool.query(
      "DELETE FROM landmarks WHERE landmark_id = ?",
      [landmarkId],
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
