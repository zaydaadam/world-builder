import { NextResponse } from "next/server";
import pool from "@/lib/db/connection";

// delete project
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const projectId = parts[parts.length - 1];
    const userId = url.searchParams.get("userId");

    if (!projectId) {
      return NextResponse.json(
        { message: "project id required" },
        { status: 400 },
      );
    }

    if (!userId) {
      return NextResponse.json({ message: "userId required" }, { status: 400 });
    }

    const [result] = await pool.query(
      "DELETE FROM projects WHERE project_id = ? AND user_id = ?",
      [projectId, userId],
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

// update project
export async function PUT(req) {
  try {
    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const projectId = parts[parts.length - 1];

    if (!projectId) {
      return NextResponse.json(
        { message: "project id required" },
        { status: 400 },
      );
    }

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

    const [result] = await pool.query(
      "UPDATE projects SET title = ?, description = ?, image_path = ? WHERE project_id = ? AND user_id = ?",
      [title, description, image_path, projectId, userId],
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "not found" }, { status: 404 });
    }

    const updatedProject = {
      project_id: Number(projectId),
      user_id: Number(userId),
      title,
      description,
      image_path,
    };

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
