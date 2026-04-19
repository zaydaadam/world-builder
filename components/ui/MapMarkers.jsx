"use client";

import { useState } from "react";

export default function MapMarkers({ mapImage }) {
  const [markers, setMarkers] = useState([]);
  const [pending, setPending] = useState(null);
  const [selected, setSelected] = useState(null);
  const [dirty, setDirty] = useState(false);

  function handleMapClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPending({
      x,
      y,
      name: "",
      description: "",
    });

    setSelected(null);
  }

  function updatePending(field, value) {
    setPending((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function placeMarker() {
    if (!pending || !pending.name.trim()) return;

    const newMarker = {
      id: Date.now(),
      ...pending,
      icon: "📖",
    };

    setMarkers((prev) => [...prev, newMarker]);
    setPending(null);
    setDirty(true);
  }

  function cancelMarker() {
    setPending(null);
  }

  function save() {
    alert("Saved");
    setDirty(false);
  }

  function openMarker(marker, e) {
    e.stopPropagation();
    setSelected(marker);
    setPending(null);
  }

  function closePopup() {
    setSelected(null);
  }

  return (
    <>
      <div
        onClick={handleMapClick}
        style={{
          position: "relative",
          display: "inline-block",
        }}
      >
        <img
          src={mapImage}
          alt="Map"
          style={{
            maxWidth: "900px",
            width: "100%",
            display: "block",
          }}
        />

        {markers.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={(e) => openMarker(m, e)}
            style={{
              position: "absolute",
              left: m.x - 12,
              top: m.y - 12,
              width: "24px",
              height: "24px",
              padding: 0,
              cursor: "pointer",
            }}
          >
            {m.icon}
          </button>
        ))}

        {pending && (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              left: pending.x + 10,
              top: pending.y + 10,
              background: "white",
              border: "1px solid black",
              padding: "10px",
              width: "220px",
            }}
          >
            <div style={{ marginBottom: "8px" }}>
              <label>Name</label>
              <br />
              <input
                value={pending.name}
                onChange={(e) => updatePending("name", e.target.value)}
                placeholder="Castle, Forest..."
              />
            </div>

            <div style={{ marginBottom: "8px" }}>
              <label>Description</label>
              <br />
              <textarea
                value={pending.description}
                onChange={(e) => updatePending("description", e.target.value)}
                rows="3"
              />
            </div>

            <button onClick={placeMarker}>Place</button>
            <button onClick={cancelMarker} style={{ marginLeft: "8px" }}>
              Cancel
            </button>
          </div>
        )}
      </div>

      {dirty && (
        <div style={{ marginTop: "12px", textAlign: "center" }}>
          <button onClick={save}>Save</button>
        </div>
      )}

      {selected && (
        <div
          onClick={closePopup}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: "20px",
              width: "300px",
            }}
          >
            <h3>Location</h3>

            <p>
              <strong>Name:</strong> {selected.name}
            </p>
            <p>
              <strong>Description:</strong> {selected.description}
            </p>

            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
