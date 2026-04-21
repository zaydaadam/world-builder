"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "@/lib/auth/logout";

export default function Topbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }
  }, []);

  return (
    <header
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 28px",
        // background: "rgba(15, 31, 56, 0.88)",
        backgroundColor: "#1f2937",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          margin: 0,
          color: "#f8fafc",
          fontSize: "18px",
          fontWeight: "700",
        }}
      >
        Welcome
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <span
          style={{
            color: "#f8fafc",
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          {user ? user.username : "User"}
        </span>

        <button
          type="button"
          onClick={() => logout(router)}
          style={{
            padding: "10px 18px",
            backgroundColor: "#27497b",
            color: "#ffffff",
            borderRadius: "12px",
            fontWeight: "600",
            fontSize: "15px",
            border: "1px solid rgba(255,255,255,0.08)",
            cursor: "pointer",
            transition: "all 0.25s ease",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.10)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#355d96";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#27497b";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}