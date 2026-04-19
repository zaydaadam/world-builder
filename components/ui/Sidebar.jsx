"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/auth/logout";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  
  const isProjectPage = pathname.startsWith("/project");

  const isActive = (path) => pathname === path;

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo">
          <h1>World Builder</h1>
        </div>

        <nav className="sidebar-nav">
          <Link
            href="/dashboard"
            className={isActive("/dashboard") ? "active-link" : ""}
          >
            Dashboard
          </Link>

          {isProjectPage && (
            <>
              <Link
                href="/project"
                className={isActive("/project") ? "active-link" : ""}
              >
                Current Project
              </Link>

              <Link
                href="/project/chapters"
                className={isActive("/project/chapters") ? "active-link" : ""}
              >
                Chapters
              </Link>

              <Link
                href="/project/characters"
                className={isActive("/project/characters") ? "active-link" : ""}
              >
                Characters
              </Link>

              <Link
                href="/project/map"
                className={isActive("/project/map") ? "active-link" : ""}
              >
                Map
              </Link>
            </>
          )}
        </nav>
      </div>

      <div className="sidebar-bottom">
        {isProjectPage && <button type="button">+ New Project</button>}

        <button type="button">Export</button>
        <button type="button">Settings</button>
        <button type="button" onClick={() => logout(router)}>
          Logout
        </button>
      </div>
    </aside>
  );
}
