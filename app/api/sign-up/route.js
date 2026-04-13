import bcrypt from "bcryptjs";
import { findUserByEmail, addUser } from "@/lib/db";

export async function POST(request) {
  const body = await request.json();

  const username = body.username;
  const email = body.email;
  const password = body.password;
  const confirmPassword = body.confirmPassword;

  if (!username || !email || !password || !confirmPassword) {
    return Response.json(
      { message: "All input fields are required" },
      { status: 400 },
    );
  }

  if (password !== confirmPassword) {
    return Response.json(
      { message: "Passwords do not match" },
      { status: 400 },
    );
  }

  const existingUser = findUserByEmail(email);

  if (existingUser) {
    return Response.json({ message: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    username: username,
    email: email,
    password: hashedPassword,
  };

  addUser(newUser);
  console.log(password);
  console.log(newUser);

  return Response.json({
    message: "Account has been created",
    user: newUser,
  });
}
