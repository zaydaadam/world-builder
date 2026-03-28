export default function DashboardPage() {
  return (
    <div>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Your Projects
      </h1>

      <button
        style={{
          padding: "10px 16px",
          backgroundColor: "#1f2a44",
          color: "white",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        + Create Project
      </button>

      <div
        style={{
          background: "white",
          padding: "16px",
          borderRadius: "10px",
          marginBottom: "12px",
        }}
      >
        <h3>The Dragon’s Heir</h3>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
      </div>

      <div
        style={{
          background: "white",
          padding: "16px",
          borderRadius: "10px",
        }}
      >
        <h3>Second Project</h3>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
      </div>
    </div>
  );
}