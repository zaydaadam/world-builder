export default function Characters() {
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "32px", marginBottom: "8px", fontWeight: "700" }}>
          Characters
        </h2>
        <p style={{ color: "#6b7280" }}>
          Keep track of your story characters
        </p>
      </div>

      <button
        style={{
          padding: "12px 18px",
          backgroundColor: "#2c558a",
          color: "white",
          borderRadius: "10px",
          marginBottom: "24px",
          fontWeight: "600",
        }}
      >
        + Add Character
      </button>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "14px",
          marginBottom: "16px",
          border: "1px solid #e5e7eb",
        }}
      >
        <h3 style={{ fontSize: "24px", marginBottom: "8px" }}>Arin Vale</h3>
        <p style={{ color: "#374151", marginBottom: "6px" }}>
          <strong>Role:</strong> Main Character
        </p>
        <p style={{ color: "#6b7280", marginBottom: "14px" }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio laborum labore excepturi inventore molestias minima. Dicta laborum aliquam fuga, natus reprehenderit eius iste, neque cupiditate nam excepturi non sequi tempore.
        </p>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            style={{
              padding: "10px 16px",
              backgroundColor: "#f3f4f6",
              borderRadius: "8px",
            }}
          >
            Edit
          </button>

          <button
            style={{
              padding: "10px 16px",
              backgroundColor: "#fde8e8",
              color: "#b91c1c",
              borderRadius: "8px",
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "14px",
          marginBottom: "16px",
          border: "1px solid #e5e7eb",
        }}
      >
        <h3 style={{ fontSize: "24px", marginBottom: "8px" }}>Lyra Thorne</h3>
        <p style={{ color: "#374151", marginBottom: "6px" }}>
          <strong>Role:</strong> Mage
        </p>
        <p style={{ color: "#6b7280", marginBottom: "14px" }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus voluptate at molestiae tempore eligendi ad excepturi minima sapiente error adipisci animi iusto veniam nam necessitatibus voluptates facilis, laudantium fugit aperiam?
        </p>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            style={{
              padding: "10px 16px",
              backgroundColor: "#f3f4f6",
              borderRadius: "8px",
            }}
          >
            Edit
          </button>

          <button
            style={{
              padding: "10px 16px",
              backgroundColor: "#fde8e8",
              color: "#b91c1c",
              borderRadius: "8px",
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "14px",
          border: "1px solid #e5e7eb",
        }}
      >
        <h3 style={{ fontSize: "24px", marginBottom: "8px" }}>King Edrin</h3>
        <p style={{ color: "#374151", marginBottom: "6px" }}>
          <strong>Role:</strong> Ruler
        </p>
        <p style={{ color: "#6b7280", marginBottom: "14px" }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia ullam officiis obcaecati ipsa quos at delectus ad minus, rerum tempore! Sapiente culpa eligendi at cum dolorum, velit facere accusamus numquam!
        </p>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            style={{
              padding: "10px 16px",
              backgroundColor: "#f3f4f6",
              borderRadius: "8px",
            }}
          >
            Edit
          </button>

          <button
            style={{
              padding: "10px 16px",
              backgroundColor: "#fde8e8",
              color: "#b91c1c",
              borderRadius: "8px",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}