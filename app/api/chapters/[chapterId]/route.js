import { NextResponse } from "next/server";
import pool from "@/lib/db/connection";

// update one chapter
export async function PUT(req) {
  try {
    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const chapterId = parts[parts.length - 1];

    const body = await req.json();
    const title = body.title;
    const content = body.content || "";

    if (!chapterId) {
      return NextResponse.json(
        { message: "chapter id required" },
        { status: 400 },
      );
    }

    if (!title || title.trim() === "") {
      return NextResponse.json({ message: "title required" }, { status: 400 });
    }

    const [result] = await pool.query(
      "UPDATE chapters SET title = ?, content = ? WHERE chapter_id = ?",
      [title, content, chapterId],
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "not found" }, { status: 404 });
    }

    const [rows] = await pool.query(
      "SELECT * FROM chapters WHERE chapter_id = ?",
      [chapterId],
    );

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "error updating chapter" },
      { status: 500 },
    );
  }
}

// delete one chapter
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const chapterId = parts[parts.length - 1];

    if (!chapterId) {
      return NextResponse.json(
        { message: "chapter id required" },
        { status: 400 },
      );
    }

    const [result] = await pool.query(
      "DELETE FROM chapters WHERE chapter_id = ?",
      [chapterId],
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
