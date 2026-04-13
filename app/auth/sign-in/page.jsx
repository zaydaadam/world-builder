"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
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

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful");
      router.push("/dashboard");
    } catch (error) {
      console.log("Login error:", error);
      alert("Something went wrong");
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Log In</h1>
        <p className="auth-subtitle">Welcome back to World Builder</p>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={function (e) {
                setEmail(e.target.value);
              }}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={function (e) {
                setPassword(e.target.value);
              }}
              required
            />
          </div>

          <button type="submit" className="auth-submit">
            Log In
          </button>
        </form>

        <p className="auth-switch">
          Don’t have an account? <Link href="/auth/sign-up">Sign Up</Link>
        </p>

        <Link href="/" className="auth-back">
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default SignIn;
