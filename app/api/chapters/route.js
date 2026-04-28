import { NextResponse } from "next/server";
import pool from "@/lib/db/connection";

// get chapters for one project
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
      "SELECT * FROM chapters WHERE project_id = ? ORDER BY chapter_number ASC",
      [projectId],
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "error getting chapters" },
      { status: 500 },
    );
  }
}

// create a new chapter
export async function POST(req) {
  try {
    const body = await req.json();

    const projectId = body.project_id;
    const title = body.title;
    const content = body.content || "";
    const chapterNumber = body.chapter_number;

    if (!projectId) {
      return NextResponse.json(
        { message: "project id required" },
        { status: 400 },
      );
    }

    if (!title || title.trim() === "") {
      return NextResponse.json({ message: "title required" }, { status: 400 });
    }

    const [result] = await pool.query(
      "INSERT INTO chapters (project_id, title, chapter_number, content) VALUES (?, ?, ?, ?)",
      [projectId, title, chapterNumber, content],
    );

    return NextResponse.json({
      chapter_id: result.insertId,
      project_id: projectId,
      title,
      chapter_number: chapterNumber,
      content,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "error creating chapter" },
      { status: 500 },
    );
  }
}
