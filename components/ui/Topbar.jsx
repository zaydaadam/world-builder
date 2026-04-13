"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "@/lib/auth/logout";

export default function Topbar() {
  const router = useRouter();

  // store logged in user
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }
  }, []);

  return (
    <header className="topbar">
      <h2>Welcome</h2>

      <div className="topbar-right">
        <span>{user ? user.username : "User"}</span>
        <button type="button" onClick={() => logout(router)}>
          Logout
        </button>
      </div>
    </header>
  );
}
