"use client";

import { useEffect, useState } from "react";

export default function MapMarkers({ mapImage, mapId }) {
  const [markers, setMarkers] = useState([]);
  const [pending, setPending] = useState(null);
  const [selected, setSelected] = useState(null);

  // load markers when map is ready
  useEffect(
    function () {
      getMarkers();
    },
    [mapId],
  );

  // get markers for this map
  async function getMarkers() {
    try {
      if (!mapId) return;

      const res = await fetch(`/api/landmarks?mapId=${mapId}`);
      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setMarkers(data);
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  }

  // start a new marker where the user clicks
  function handleMapClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPending({
      x,
      y,
      name: "",
      description: "",
    });

    setSelected(null);
  }

  // update marker form
  function updatePending(field, value) {
    setPending(function (prev) {
      return {
        ...prev,
        [field]: value,
      };
    });
  }

  // save marker
  async function placeMarker() {
    if (!pending || !pending.name.trim()) return;
    if (!mapId) return;

    try {
      const res = await fetch("/api/landmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          map_id: mapId,
          name: pending.name,
          description: pending.description,
          x: pending.x,
          y: pending.y,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setMarkers((prev) => [...prev, data]);

      setPending(null);
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  }

  // cancel new marker
  function cancelMarker() {
    setPending(null);
  }

  // open marker details
  function openMarker(marker, e) {
    e.stopPropagation();
    setSelected(marker);
    setPending(null);
  }

  // close marker details
  function closePopup() {
    setSelected(null);
  }

  // delete marker
  async function deleteMarker(markerId) {
    if (!markerId) return;

    const confirmed = window.confirm("Delete this marker?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/landmarks/${markerId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setMarkers((prev) =>
        prev.filter((marker) => marker.landmark_id !== markerId),
      );

      setSelected(null);
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  }

  return (
    <>
      <div
        onClick={handleMapClick}
        style={{
          position: "relative",
          display: "inline-block",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        <img
          src={mapImage}
          alt="Map"
          style={{
            width: "100%",
            display: "block",
          }}
        />

        {markers.map(function (m) {
          return (
            <button
              key={m.landmark_id}
              type="button"
              onClick={(e) => openMarker(m, e)}
              style={{
                position: "absolute",
                left: `${Number(m.x_coordinate)}%`,
                top: `${Number(m.y_coordinate)}%`,
                transform: "translate(-50%, -50%)",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              📖
            </button>
          );
        })}

        {pending && (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              left: `${pending.x}%`,
              top: `${pending.y}%`,
              transform: "translate(12px, 12px)",
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "14px",
              width: "260px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              zIndex: 10,
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              <label style={{ fontWeight: "600", display: "block" }}>
                Name
              </label>

              <input
                value={pending.name}
                onChange={(e) => updatePending("name", e.target.value)}
                placeholder="Castle, Forest..."
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  marginTop: "4px",
                }}
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontWeight: "600", display: "block" }}>
                Description
              </label>

              <textarea
                value={pending.description}
                onChange={(e) => updatePending("description", e.target.value)}
                rows="3"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  marginTop: "4px",
                  resize: "vertical",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                onClick={placeMarker}
                style={{
                  padding: "8px 14px",
                  backgroundColor: "#2c558a",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Place
              </button>

              <button
                type="button"
                onClick={cancelMarker}
                style={{
                  padding: "8px 14px",
                  backgroundColor: "#f3f4f6",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

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
            zIndex: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: "20px",
              width: "320px",
              borderRadius: "14px",
            }}
          >
            <h3 style={{ fontSize: "24px", marginBottom: "12px" }}>Location</h3>

            <p>
              <strong>Name:</strong> {selected.name}
            </p>

            <p>
              <strong>Description:</strong> {selected.description}
            </p>

            <button onClick={closePopup}>Close</button>

            <button
              onClick={() => deleteMarker(selected.landmark_id)}
              style={{ marginLeft: "8px" }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}
