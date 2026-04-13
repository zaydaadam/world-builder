import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5efe6",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 24px",
        }}
      >
        <h1 style={{ fontSize: "22px", fontWeight: "700", margin: 0 }}>
          World Builder
        </h1>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <Link
            href="/login"
            style={{
              color: "#1f2937",
              fontSize: "14px",
            }}
          >
            Log In
          </Link>

          <Link
            href="/register"
            style={{
              padding: "8px 14px",
              backgroundColor: "#2c558a",
              color: "white",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Get Started
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
          padding: "40px",
        }}
      >
        <div style={{ maxWidth: "600px" }}>
          <h2
            style={{
              fontSize: "42px",
              fontWeight: "700",
              marginBottom: "16px",
            }}
          >
            Build your world from the ground up.
          </h2>

          <p style={{ color: "#6b7280", marginBottom: "8px" }}>
            Write your story, shape your characters, and organize everything in
            one place.
          </p>

          <p style={{ color: "#6b7280", marginBottom: "24px" }}>
            Stay focused as your world grows.
          </p>

          <Link
            href="/register"
            style={{
              padding: "14px 22px",
              backgroundColor: "#2c558a",
              color: "white",
              borderRadius: "10px",
              fontWeight: "600",
              display: "inline-block",
            }}
          >
            Get Started
          </Link>

          <p style={{ marginTop: "12px", color: "#9ca3af" }}>
            Built for creators.
          </p>
        </div>
      </section>
      {/* Footer */}
      <footer
        style={{
          padding: "20px",
          textAlign: "center",
          color: "#6b7280",
          fontSize: "14px",
        }}
      >
        <p>&copy; 2026 World Builder. All rights reserved.</p>
      </footer>
    </main>
  );
}
