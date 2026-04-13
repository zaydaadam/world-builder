import Link from "next/link";

export default function Home() {
  return (
    <main className="home-page">
      <header className="navbar">
        <h1 className="logo">World Builder</h1>

        <nav className="nav-links">
          <Link href="/auth/sign-in" className="nav-login">
            Log In
          </Link>

          <Link href="/auth/sign-up" className="nav-button">
            Get Started
          </Link>
        </nav>
      </header>

      <section className="hero">
        <h2>Build your world from the ground up.</h2>
        <p>
          Write your story, shape your characters, and organize everything in
          one place.
        </p>
        <p>Stay focused as your world grows.</p>

        <Link href="/auth/sign-up" className="hero-button">
          Get Started
        </Link>

        <span className="hero-note">Built for creators.</span>
      </section>

      <footer className="footer">
        <p>&copy; 2026 World Builder. All rights reserved.</p>

        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Contact</a>
          <a href="#">Terms</a>
        </div>
      </footer>
    </main>
  );
}
