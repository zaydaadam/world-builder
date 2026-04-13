export default function Chapters() {
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "32px", marginBottom: "8px", fontWeight: "700" }}>
          Chapters
        </h2>
        <p style={{ color: "#6b7280" }}>
          Organize your story chapters and writing
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
        + Add Chapter
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
        <h3 style={{ fontSize: "26px", marginBottom: "8px" }}>
          Chapter 1: The Spark
        </h3>
        <p style={{ color: "#6b7280", marginBottom: "14px" }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo laboriosam aut tempora dolorem distinctio ab, maiores, ratione in similique saepe voluptate repellat quis, ipsum voluptates non perferendis qui enim unde?
        </p>
        {/* <p style={{ color: "#6b7280", marginBottom: "14px" }}>
          1,250 words &nbsp; | &nbsp; Last edited Feb 22
        </p> */}

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
        <h3 style={{ fontSize: "26px", marginBottom: "8px" }}>
          Chapter 2: Awakening
        </h3>
        <p style={{ color: "#6b7280", marginBottom: "14px" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus dolor quam magni voluptate, consectetur ex adipisci quas, assumenda corporis mollitia minus explicabo! Nam omnis ut magni vitae illum aliquam sunt?
        </p>
        {/* <p style={{ color: "#6b7280", marginBottom: "14px" }}>
          2,100 words &nbsp; | &nbsp; Last edited Feb 21
        </p> */}

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
        <h3 style={{ fontSize: "26px", marginBottom: "8px" }}>
          Chapter 3: The Call
        </h3>
        <p style={{ color: "#6b7280", marginBottom: "14px" }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia ullam officiis obcaecati ipsa quos at delectus ad minus, rerum tempore! Sapiente culpa eligendi at cum dolorum, velit facere accusamus numquam!
        </p>
        {/* <p style={{ color: "#6b7280", marginBottom: "14px" }}>
          Draft &nbsp; | &nbsp; Last edited Feb 20
        </p> */}

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
