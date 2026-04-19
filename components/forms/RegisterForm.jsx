"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  // store user input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // store validation errors and server messages
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");

  // regex to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const cleanUsername = username.trim();
  const cleanEmail = email.trim().toLowerCase();

  async function handleSignUp(e) {
    e.preventDefault();

    setErrors({});
    setServerMessage("");

    const err = {};

    // validate inputs
    if (!cleanUsername) err.username = "Username required";
    if (!cleanEmail || !emailRegex.test(cleanEmail))
      err.email = "Enter a valid email";
    if (!password) err.password = "Password required";
    if (password !== confirmPassword)
      err.confirmPassword = "Passwords don’t match";

    // stop if validation fails
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: cleanUsername,
          email: cleanEmail,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      // show server error if failed
      if (!res.ok) {
        setServerMessage(data.error || "Sign up failed");
        return;
      }

      // redirect to login after successful signup
      router.push("/login");
    } catch (err) {
      console.log("signup error:", err);
      setServerMessage("Something went wrong");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5efe6",
      }}
    >
      <div
        style={{
          width: "430px",
          background: "white",
          padding: "32px",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
        }}
      >
        <h1
          style={{ fontSize: "28px", fontWeight: "700", marginBottom: "6px" }}
        >
          Sign Up
        </h1>

        <p style={{ color: "#6b7280", marginBottom: "24px" }}>
          Create your account
        </p>

        {serverMessage && (
          <p style={{ color: "#b91c1c", marginBottom: "16px" }}>
            {serverMessage}
          </p>
        )}

        <form onSubmit={handleSignUp}>
          <div style={{ marginBottom: "16px" }}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
              }}
            />
            {errors.username && (
              <p style={{ color: "#b91c1c" }}>{errors.username}</p>
            )}
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
              }}
            />
            {errors.email && <p style={{ color: "#b91c1c" }}>{errors.email}</p>}
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
              }}
            />
            {errors.password && (
              <p style={{ color: "#b91c1c" }}>{errors.password}</p>
            )}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
              }}
            />
            {errors.confirmPassword && (
              <p style={{ color: "#b91c1c" }}>{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#2c558a",
              color: "white",
              borderRadius: "10px",
              fontWeight: "600",
              marginBottom: "16px",
            }}
          >
            Sign Up
          </button>
        </form>

        <p style={{ textAlign: "center", marginBottom: "10px" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#2c558a" }}>
            Log In
          </Link>
        </p>

        <p style={{ textAlign: "center" }}>
          <Link href="/" style={{ color: "#6b7280" }}>
            Back
          </Link>
        </p>
      </div>
    </main>
  );
}
