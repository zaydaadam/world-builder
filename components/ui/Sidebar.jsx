"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/auth/logout";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isProjectPage = pathname.startsWith("/project");

  const isActive = (path) => pathname === path;

  function linkStyle(path) {
    return {
      padding: "10px 14px",
      borderRadius: "10px",
      textDecoration: "none",
      color: "#f8fafc",
      fontWeight: "500",
      background: isActive(path) ? "rgba(255,255,255,0.12)" : "transparent",
      transition: "all 0.2s ease",
    };
  }

  function buttonStyle() {
    return {
      padding: "10px",
      borderRadius: "10px",
      border: "none",
      background: "rgba(255,255,255,0.08)",
      color: "#f8fafc",
      cursor: "pointer",
      transition: "all 0.2s ease",
    };
  }

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
        backgroundImage:
          "linear-gradient(rgba(12,18,31,0.85), rgba(12,18,31,0.92)), url('/images/sidebar_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#f8fafc",
      }}
    >
      <div>
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
              height: "50px",
              borderRadius: "10px",
              backgroundColor: "white",
              padding: "4px 8px",
            }}
          />
        </div>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Link href="/dashboard" style={linkStyle("/dashboard")}>
            Dashboard
          </Link>

          {isProjectPage && (
            <>
              <Link href="/project" style={linkStyle("/project")}>
                Current Project
              </Link>

              <Link
                href="/project/chapters"
                style={linkStyle("/project/chapters")}
              >
                Chapters
              </Link>

              <Link
                href="/project/characters"
                style={linkStyle("/project/characters")}
              >
                Characters
              </Link>

              <Link href="/project/map" style={linkStyle("/project/map")}>
                Map
              </Link>
            </>
          )}
        </nav>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* {isProjectPage && (
          <button type="button" style={buttonStyle()}>
            + New Project
          </button>
        )} */}

        <button
          type="button"
          onClick={() => window.print()}
          style={buttonStyle()}
        >
          Export
        </button>
        {/* <button type="button" style={buttonStyle()}>
          Settings
        </button> */}

        <button
          type="button"
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