"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/auth/logout";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path) => pathname === path;

  return (
    <aside
      style={{
        width: "250px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px",
        boxSizing: "border-box",

        // Background image
        backgroundImage:
          // "linear-gradient(rgba(12,18,31,0.85), rgba(12,18,31,0.92)), url('/images/sidebar_bg.png')",
           "linear-gradient(rgba(12,18,31,0.60), rgba(12,18,31,0.92)), url('/images/sidebar_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",

        color: "#f8fafc",
      }}
    >
      {/* Top */}
      <div>
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "30px",
          }}
        >
          <img
            src="/images/logo_wb.png"
            alt="logo"
            style={{
              height: "45px",
              borderRadius: "8px",
              backgroundColor: "rgba(255,255,255,0.95)",
              padding: "4px 6px",
            }}
          />
          {/* <h1
            style={{
              fontSize: "18px",
              margin: 0,
              fontWeight: "700",
            }}
          >
            World Builder
          </h1> */}
        </div>

        {/* Nav */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {[
            "Dashboard",
            "Current Project",
            "Chapters",
            "Characters",
          ].map((item) => (
            <Link
              key={item}
              href="/project"
              style={{
                padding: "10px 14px",
                borderRadius: "10px",
                textDecoration: "none",
                color: "#f8fafc",
                fontWeight: "500",
                background: isActive("/project")
                  ? "rgba(255,255,255,0.12)"
                  : "transparent",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isActive("/project")
                  ? "rgba(255,255,255,0.12)"
                  : "transparent";
              }}
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {["+ New Project", "Export", "Settings"].map((btn) => (
          <button
            key={btn}
            style={{
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              background: "rgba(255,255,255,0.08)",
              color: "#f8fafc",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "rgba(255,255,255,0.14)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "rgba(255,255,255,0.08)";
            }}
          >
            {btn}
          </button>
        ))}

        <button
          onClick={() => logout(router)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            background: "#27497b",
            color: "#ffffff",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}