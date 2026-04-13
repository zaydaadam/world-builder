"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo">
          <h1>World Builder</h1>
        </div>

        <nav className="sidebar-nav">
          <Link
            href="/"
            className={isActive("/") ? "active-link" : ""}
          >
            Dashboard
          </Link>

          <Link
            href="/project"
            className={isActive("/project") ? "active-link" : ""}
          >
            Current Project
          </Link>

          <Link
            href="/project"
            className={isActive("/project") ? "active-link" : ""}
          >
            Chapters
          </Link>

          <Link
            href="/project"
            className={isActive("/project") ? "active-link" : ""}
          >
            Characters
          </Link>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <button type="button">+ New Project</button>
        <button type="button">Export</button>
        <button type="button">Settings</button>
        <button type="button">Logout</button>
      </div>
    </aside>
  );
}