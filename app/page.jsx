"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [loginHover, setLoginHover] = useState(false);
  const [startHover, setStartHover] = useState(false);
  const [heroBtnHover, setHeroBtnHover] = useState(false);

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
            onMouseEnter={() => setStartHover(true)}
            onMouseLeave={() => setStartHover(false)}
            style={{
              padding: "10px 18px",
              backgroundColor: startHover ? "#355d96" : "#27497b",
              color: "#ffffff",
              borderRadius: "12px",
              fontWeight: "600",
              fontSize: "15px",
              textDecoration: "none",
              transition: "all 0.25s ease",
              boxShadow: startHover
                ? "0 8px 18px rgba(0, 0, 0, 0.18)"
                : "0 4px 10px rgba(0, 0, 0, 0.10)",
              transform: startHover ? "translateY(-2px)" : "translateY(0)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 24px 48px",
          backgroundImage:
            "linear-gradient(rgba(14, 24, 39, 0.66), rgba(14, 24, 39, 0.66)), url('/images/hero_wb.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={{ maxWidth: "700px" }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "900",
              marginBottom: "18px",
              color: "#ffffff",
              lineHeight: "1.1",
            }}
          >
            Build your world from the ground up.
          </h1>

          <p style={{ color: "#e5e7eb", marginBottom: "10px", fontSize: "20px" }}>
            Write your story, shape your characters, and organize everything in
            one place.
          </p>

          <p style={{ color: "#e5e7eb", marginBottom: "30px", fontSize: "20px" }}>
            Stay focused as your world grows.
          </p>

          <Link
            href="/register"
            onMouseEnter={() => setHeroBtnHover(true)}
            onMouseLeave={() => setHeroBtnHover(false)}
            style={{
              padding: "14px 26px",
              backgroundColor: heroBtnHover ? "#244872" : "#2c558a",
              color: "#ffffff",
              borderRadius: "12px",
              fontWeight: "600",
              textDecoration: "none",
              transition: "all 0.25s ease",
              display: "inline-block",
            }}
          >
            Get Started
          </Link>
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