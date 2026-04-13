"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  
  // store user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      // send login request to backend
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await res.json();

      // if login fails, show error
      if (!res.ok) {
        alert(data.error || data.message || "Login failed");
        return;
      }
      
      // save user info in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/project");
    } catch (error) {
      console.log("Login error:", error);
      alert("Something went wrong");
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
          width: "400px",
          background: "white",
          padding: "32px",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            marginBottom: "6px",
          }}
        >
          Log In
        </h1>

        <p style={{ color: "#6b7280", marginBottom: "24px" }}>
          Welcome back to World Builder
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "6px" }}>
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
              }}
              required
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "6px" }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
              }}
              required
            />
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
            Log In
          </button>
        </form>

        <p style={{ textAlign: "center", marginBottom: "10px" }}>
          Don’t have an account?{" "}
          <Link href="/register" style={{ color: "#2c558a" }}>
            Sign Up
          </Link>
        </p>

        <p style={{ textAlign: "center" }}>
          <Link href="/" style={{ color: "#6b7280" }}>
            Back to Home
          </Link>
        </p>
      </div>
    </main>
  );
}
