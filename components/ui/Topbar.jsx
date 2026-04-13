"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth/logout";

export default function Topbar() {
  const router = useRouter();

  return (
    <header className="topbar">
      <h2>Welcome</h2>

      <div className="topbar-right">
        <span>User</span>
        <button type="button" onClick={() => logout(router)}>
          Logout
        </button>
      </div>
    </header>
  );
}
