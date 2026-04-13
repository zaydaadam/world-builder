"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(
    function () {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        router.push("/auth/sign-in");
        return;
      }

      setUser(JSON.parse(storedUser));
    },
    [router],
  );

  function handleLogout() {
    localStorage.removeItem("user");
    router.push("/auth/sign-in");
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-shell">
        <header className="dashboard-topbar">
          <nav className="dashboard-nav">
            <button className="dashboard-tab">Chapters</button>
            <button className="dashboard-tab">Characters</button>
            <button className="dashboard-tab">Map</button>
          </nav>
        </header>

        <div className="dashboard-body">
          <aside className="dashboard-sidebar">
            <div className="dashboard-search">
              <span className="search-icon"></span>
              <span>Search</span>
            </div>

            <div className="dashboard-project-list">
              <div className="dashboard-project-item">
                <span>The Five Nations</span>
                <button className="project-more">Button</button>
              </div>
            </div>

            <div className="dashboard-user-card">
              <div className="dashboard-avatar"></div>

              <div className="dashboard-user-info">
                <p className="dashboard-user-name">{user.username}</p>
                <p className="dashboard-user-email">{user.email}</p>
              </div>

              <button className="user-menu-btn" onClick={handleLogout}>
                ...
              </button>
            </div>
          </aside>

          <section className="dashboard-main">
            <div className="dashboard-empty-state">
              <h1>Start something new</h1>
              <button className="dashboard-create-btn">Create Project</button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
