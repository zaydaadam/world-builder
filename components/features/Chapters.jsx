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
          display: "flex",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: "24px", marginBottom: "8px" }}>Arin Vale</h3>
          <p style={{ color: "#374151", marginBottom: "6px" }}>
            <strong>Role:</strong> Main Character
          </p>
          <p style={{ color: "#6b7280", marginBottom: "14px" }}>
            A blacksmith who discovers a hidden link to an ancient dragon bloodline.
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
            position: "relative",
            width: "120px",
            height: "120px",
            border: "2px dashed #d1d5db",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f9fafb",
            cursor: "pointer",
            transition: "border-color 0.2s ease",
            overflow: "hidden",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#9ca3af")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
        >
          <input
            type="file"
            accept="image/*"
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0,
              cursor: "pointer",
            }}
          />
          <div style={{ textAlign: "center", color: "#6b7280", pointerEvents: "none" }}>
            <div style={{ fontSize: "24px", marginBottom: "4px" }}>📷</div>
            <div style={{ fontSize: "12px" }}>Upload Image</div>
          </div>
        </div>
      </div>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "14px",
          marginBottom: "16px",
          border: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: "24px", marginBottom: "8px" }}>Lyra Thorne</h3>
          <p style={{ color: "#374151", marginBottom: "6px" }}>
            <strong>Role:</strong> Mage
          </p>
          <p style={{ color: "#6b7280", marginBottom: "14px" }}>
            A gifted sorceress who guides Arin through the secrets of the old kingdom.
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
            position: "relative",
            width: "150px",
            height: "150px",
            border: "2px dashed #d1d5db",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f9fafb",
            cursor: "pointer",
            transition: "border-color 0.2s ease",
            overflow: "hidden",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#9ca3af")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
        >
          <input
            type="file"
            accept="image/*"
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0,
              cursor: "pointer",
            }}
          />
          <div style={{ textAlign: "center", color: "#6b7280", pointerEvents: "none" }}>
            <div style={{ fontSize: "24px", marginBottom: "4px" }}>📷</div>
            <div style={{ fontSize: "12px" }}>Upload Image</div>
          </div>
        </div>
      </div>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "14px",
          border: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: "24px", marginBottom: "8px" }}>King Edrin</h3>
          <p style={{ color: "#374151", marginBottom: "6px" }}>
            <strong>Role:</strong> Ruler
          </p>
          <p style={{ color: "#6b7280", marginBottom: "14px" }}>
            The aging king who knows more about Arin’s past than he is willing to admit.
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
            position: "relative",
            width: "150px",
            height: "150px",
            border: "2px dashed #d1d5db",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f9fafb",
            cursor: "pointer",
            transition: "border-color 0.2s ease",
            overflow: "hidden",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#9ca3af")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
        >
          <input
            type="file"
            accept="image/*"
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0,
              cursor: "pointer",
            }}
          />
          <div style={{ textAlign: "center", color: "#6b7280", pointerEvents: "none" }}>
            <div style={{ fontSize: "24px", marginBottom: "4px" }}>📷</div>
            <div style={{ fontSize: "12px" }}>Upload Image</div>
          </div>
        </div>
      </div>
    </div>
  );
}

