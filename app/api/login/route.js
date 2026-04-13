import bcrypt from "bcryptjs";
import { findUserByEmail } from "@/lib/db";

export async function POST(request) {
  const body = await request.json();

  const email = body.email.trim().toLowerCase();
  const password = body.password;

  if (!email || !password) {
    return Response.json(
      { message: "Email and password required" },
      { status: 400 },
    );
  }

  const user = findUserByEmail(email);

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return Response.json({ message: "Wrong password" }, { status: 400 });
  }

  return Response.json({
    message: "Login successful",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
}
