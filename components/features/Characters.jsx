"use client";

import { useEffect, useState } from "react";
import ImageUpload from "@/components/ui/ImageUpload";

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState("");

  useEffect(function () {
    getCharacters();
  }, []);

  // get characters for current project
  async function getCharacters() {
    try {
      const savedProject = localStorage.getItem("currentProject");
      if (!savedProject) return;

      const project = JSON.parse(savedProject);

      const res = await fetch(
        `/api/characters?projectId=${project.project_id}`,
      );
      const data = await res.json();

      if (!res.ok) {
        // alert(data.message);
        return;
      }

      setCharacters(data);
    } catch (error) {
      console.log(error);
      // alert("something went wrong");
    }
  }

  // clears form values
  function resetForm() {
    setName("");
    setRole("");
    setDescription("");
    setImagePath("");
    setEditingId(null);
    setShowForm(false);
  }

  // fills form when editing
  function handleEditCharacter(character) {
    setEditingId(character.character_id);
    setName(character.name || "");
    setRole(character.role || "");
    setDescription(character.description || "");
    setImagePath(character.image_path || "");
    setShowForm(true);
  }

  // create or update character
  async function handleCreateCharacter(e) {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      const savedProject = localStorage.getItem("currentProject");
      if (!savedProject) return;

      const project = JSON.parse(savedProject);

      const url = editingId
        ? `/api/characters/${editingId}`
        : "/api/characters";
      const method = editingId ? "PUT" : "POST";

      const body = editingId
        ? {
            name: name,
            role: role,
            description: description,
            image_path: imagePath || null,
          }
        : {
            project_id: project.project_id,
            name: name,
            role: role,
            description: description,
            image_path: imagePath || null,
          };

      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        // alert(data.message);
        return;
      }

      if (editingId) {
        setCharacters(function (prev) {
          return prev.map(function (character) {
            if (character.character_id === editingId) {
              return {
                ...character,
                name: data.name,
                role: data.role,
                description: data.description,
                image_path: data.image_path,
              };
            }

            return character;
          });
        });
      } else {
        setCharacters(function (prev) {
          return [data, ...prev];
        });
      }

      resetForm();
    } catch (error) {
      console.log(error);
      // alert("something went wrong");
    }
  }

  // delete character
  async function handleDeleteCharacter(characterId) {
    const confirmed = window.confirm("Delete this character?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/characters/${characterId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        // alert(data.message);
        return;
      }

      setCharacters(function (prev) {
        return prev.filter(function (character) {
          return character.character_id !== characterId;
        });
      });
    } catch (error) {
      console.log(error);
      // alert("something went wrong");
    }
  }

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{ fontSize: "32px", marginBottom: "8px", fontWeight: "700" }}
        >
          Characters
        </h2>

        <p className="print-hidden" style={{ color: "#6b7280" }}>Keep track of your story characters</p>
      </div>

      {!showForm && (
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="print-hidden"
        style={{
            padding: "12px 18px",
            backgroundColor: "#2c558a",
            color: "white",
            borderRadius: "10px",
            marginBottom: "24px",
            fontWeight: "600",
            border: "none",
            cursor: "pointer",
          }}
        >
          + Add Character
        </button>
      )}

      {showForm && (
        <form
          onSubmit={handleCreateCharacter}
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "14px",
            marginBottom: "16px",
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ marginBottom: "12px" }}>
            <input
              placeholder="Character name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
              }}
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <input
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
              }}
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: "100%",
                minHeight: "120px",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                resize: "vertical",
              }}
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <ImageUpload onUpload={setImagePath} />

            {imagePath && (
              <img
                src={imagePath}
                alt="Preview"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  objectPosition: "top",
                  borderRadius: "8px",
                  marginTop: "10px",
                }}
              />
            )}
          </div>

          <button
            type="submit"
            className="print-hidden"
            style={{
              padding: "10px 16px",
              backgroundColor: "#2c558a",
              color: "white",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {editingId ? "Save Changes" : "Save"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="print-hidden"
            style={{
              padding: "10px 16px",
              backgroundColor: "#f3f4f6",
              borderRadius: "8px",
              border: "none",
              marginLeft: "10px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </form>
      )}

      {characters.length === 0 ? (
        <p>No characters yet.</p>
      ) : (
        characters.map(function (character) {
          return (
            <div
              key={character.character_id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "14px",
                marginBottom: "16px",
                border: "1px solid #e5e7eb",
              }}
            >
              <h3 style={{ fontSize: "24px", marginBottom: "8px" }}>
                {character.name}
              </h3>

              <p style={{ color: "#374151", marginBottom: "6px" }}>
                <strong>Role:</strong> {character.role}
              </p>

              <p style={{ color: "#6b7280", marginBottom: "14px" }}>
                {character.description}
              </p>

              {character.image_path && (
                <img
                  src={character.image_path}
                  alt={character.name}
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    objectPosition: "top",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
              )}

              <div style={{ display: "flex", gap: "12px" }}>
                <button
            className="print-hidden"
                  onClick={() => handleEditCharacter(character)}
                  style={{
                    padding: "10px 16px",
                    backgroundColor: "#f3f4f6",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteCharacter(character.character_id)}
                  className="print-hidden"
            style={{
                    padding: "10px 16px",
                    backgroundColor: "#fde8e8",
                    color: "#b91c1c",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
