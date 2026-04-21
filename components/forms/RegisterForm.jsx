"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");

  const [loginHover, setLoginHover] = useState(false);
  const [signHover, setSignHover] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const trimmedUsername = username.trim();
  const trimmedEmail = email.trim();

  const emailValid = trimmedEmail.length > 0 && emailRegex.test(trimmedEmail);

  async function handleSignUp(e) {
    e.preventDefault();

    setErrors({});
    setServerMessage("");

    const newErrors = {};

    if (!trimmedUsername) newErrors.username = "Username required";
    if (!emailValid) newErrors.email = "Valid email required";
    if (!password) newErrors.password = "Password required";
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: trimmedUsername,
          email: trimmedEmail,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerMessage(data.error || "Sign up failed");
        return;
      }

      router.push("/login");
    } catch (error) {
      console.log("Sign up error:", error);
      setServerMessage("Something went wrong");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "#1f2937",
        backgroundColor: "#f8fafc",
        margin: 0,
      }}
    >
      {/* Navbar */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 32px",
          background: "rgba(15, 31, 56, 0.88)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 10,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/images/logo_wb.png"
              alt="World Builder Logo"
              style={{
                height: "45px",
                borderRadius: "10px",
                backgroundColor: "rgba(255,255,255,0.95)",
                padding: "4px 8px",
              }}
            />
          </Link>

          <span
            style={{
              color: "#f8fafc",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Welcome
          </span>
        </div>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Link
            href="/login"
            onMouseEnter={() => setLoginHover(true)}
            onMouseLeave={() => setLoginHover(false)}
            style={{
              padding: "10px 18px",
              backgroundColor: loginHover ? "#355d96" : "#27497b",
              color: "#ffffff",
              borderRadius: "12px",
              fontWeight: "600",
              fontSize: "15px",
              textDecoration: "none",
              transition: "all 0.25s ease",
              boxShadow: loginHover
                ? "0 8px 18px rgba(0, 0, 0, 0.18)"
                : "0 4px 10px rgba(0, 0, 0, 0.10)",
              transform: loginHover ? "translateY(-2px)" : "translateY(0)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            Log In
          </Link>

          <Link
            href="/register"
            onMouseEnter={() => setSignHover(true)}
            onMouseLeave={() => setSignHover(false)}
            style={{
              padding: "10px 18px",
              backgroundColor: signHover ? "#355d96" : "#27497b",
              color: "#ffffff",
              borderRadius: "12px",
              fontWeight: "600",
              fontSize: "15px",
              textDecoration: "none",
              transition: "all 0.25s ease",
              boxShadow: signHover
                ? "0 8px 18px rgba(0, 0, 0, 0.18)"
                : "0 4px 10px rgba(0, 0, 0, 0.10)",
              transform: signHover ? "translateY(-2px)" : "translateY(0)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Register Section */}
      <section
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 48px",
          backgroundImage:
            "linear-gradient(rgba(14, 24, 39, 0.72), rgba(14, 24, 39, 0.72)), url('/images/hero_wb.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            width: "430px",
            background: "rgba(255, 255, 255, 0.92)",
            padding: "32px",
            borderRadius: "18px",
            border: "1px solid rgba(255,255,255,0.4)",
            boxShadow: "0 18px 40px rgba(0, 0, 0, 0.22)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            boxSizing: "border-box",
          }}
        >
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "700",
              marginBottom: "6px",
              color: "#1f2f46",
            }}
          >
            Sign Up
          </h1>

          <p style={{ color: "#6b7280", marginBottom: "24px" }}>
            Create your World Builder account
          </p>

          {serverMessage && (
            <p style={{ color: "#b91c1c", marginBottom: "16px" }}>
              {serverMessage}
            </p>
          )}

          <form onSubmit={handleSignUp}>
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  color: "#1f2937",
                  fontWeight: "500",
                }}
              >
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 12px",
                  borderRadius: "10px",
                  border: "1px solid #cfd8e3",
                  backgroundColor: "#eaf0f8",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              {errors.username && (
                <p style={{ color: "#b91c1c", marginTop: "6px", marginBottom: 0 }}>
                  {errors.username}
                </p>
              )}
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  color: "#1f2937",
                  fontWeight: "500",
                }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 12px",
                  borderRadius: "10px",
                  border: "1px solid #cfd8e3",
                  backgroundColor: "#eaf0f8",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              {errors.email && (
                <p style={{ color: "#b91c1c", marginTop: "6px", marginBottom: 0 }}>
                  {errors.email}
                </p>
              )}
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  color: "#1f2937",
                  fontWeight: "500",
                }}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 12px",
                  borderRadius: "10px",
                  border: "1px solid #cfd8e3",
                  backgroundColor: "#eaf0f8",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              {errors.password && (
                <p style={{ color: "#b91c1c", marginTop: "6px", marginBottom: 0 }}>
                  {errors.password}
                </p>
              )}
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  color: "#1f2937",
                  fontWeight: "500",
                }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 12px",
                  borderRadius: "10px",
                  border: "1px solid #cfd8e3",
                  backgroundColor: "#eaf0f8",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              {errors.confirmPassword && (
                <p style={{ color: "#b91c1c", marginTop: "6px", marginBottom: 0 }}>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              onMouseEnter={() => setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: buttonHover ? "#355d96" : "#2c558a",
                color: "white",
                borderRadius: "12px",
                fontWeight: "600",
                marginBottom: "16px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.25s ease",
                boxShadow: buttonHover
                  ? "0 8px 18px rgba(0, 0, 0, 0.18)"
                  : "0 4px 10px rgba(0, 0, 0, 0.10)",
                transform: buttonHover ? "translateY(-2px)" : "translateY(0)",
              }}
            >
              Sign Up
            </button>
          </form>

          <p style={{ textAlign: "center", marginBottom: "10px", color: "#374151" }}>
            Already have an account?{" "}
            <Link
              href="/login"
              style={{
                color: "#2c558a",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Log In
            </Link>
          </p>

          <p style={{ textAlign: "center", margin: 0 }}>
            <Link
              href="/"
              style={{
                color: "#6b7280",
                textDecoration: "none",
              }}
            >
              Back to Home
            </Link>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "16px",
          textAlign: "center",
          background: "rgba(15, 31, 56, 0.92)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          fontSize: "13px",
          color: "#e2e8f0",
        }}
      >
        <p style={{ margin: 0 }}>&copy; 2026 World Builder. All rights reserved.</p>
      </footer>
    </main>
  );
}