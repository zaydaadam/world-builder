"use client";

import { useEffect, useState } from "react";
import TextEditor from "@/components/ui/TextEditor";

export default function Chapters() {
  const [chapters, setChapters] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [editingId, setEditingId] = useState(null);
 
  
  function handleEditClick(chapter) {
    setEditingId(chapter.chapter_id);
    setTitle(chapter.title);
    setContent(chapter.content || "");
    setShowForm(true);
  }

  // load chapters when page opens
  useEffect(function () {
    getChapters();
  }, []);

  // get chapters for current project
  async function getChapters() {
    try {
      const savedProject = localStorage.getItem("currentProject");

      if (!savedProject) return;

      const project = JSON.parse(savedProject);

      const res = await fetch(`/api/chapters?projectId=${project.project_id}`);
      const data = await res.json();

      if (!res.ok) {
        // alert(data.message);
        return;
      }

      setChapters(data);
    } catch (error) {
      console.log(error);
      // alert("something went wrong");
    }
  }

  // create chapter
  async function handleCreateChapter(e) {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      const savedProject = localStorage.getItem("currentProject");
      if (!savedProject) return;

      const project = JSON.parse(savedProject);

      const res = await fetch("/api/chapters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_id: project.project_id,
          title: title,
          content: content,
          chapter_number: chapters.length + 1,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // alert(data.message);
        return;
      }

      setChapters(function (prev) {
        return [...prev, data];
      });

      setTitle("");
      setContent("");
      setShowForm(false);
    } catch (error) {
      console.log(error);
      // alert("something went wrong");
    }
  }
  // update chapter
  async function handleUpdateChapter(e) {
    e.preventDefault();

    try {
      const res = await fetch(`/api/chapters/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // alert(data.message);
        return;
      }

      setChapters(function (prev) {
        return prev.map(function (chapter) {
          if (chapter.chapter_id === editingId) {
            return data;
          }

          return chapter;
        });
      });

      setEditingId(null);
      setTitle("");
      setContent("");
      setShowForm(false);
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  }
  // delete chapter
  async function handleDeleteChapter(chapterId) {
    const confirmed = window.confirm("Delete this chapter?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/chapters/${chapterId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        // alert(data.message);
        return;
      }

      setChapters(function (prev) {
        return prev.filter(function (chapter) {
          return chapter.chapter_id !== chapterId;
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
          Chapters
        </h2>

        <p className="print-hidden" style={{ color: "#6b7280" }}>
          Keep track of your story characters
        </p>
      </div>

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
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
          + Add Chapter
        </button>
      )}

      {showForm && (
        <form
          onSubmit={editingId ? handleUpdateChapter : handleCreateChapter}
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "14px",
            marginBottom: "24px",
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ marginBottom: "12px" }}>
            <input
              placeholder="Chapter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
              }}
            />
          </div>

          <div style={{ width: "100%" }}>
            <TextEditor value={content} onChange={setContent} />
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
              marginTop: "12px",
            }}
          >
            {editingId ? "Update" : "Save"}
          </button>

          <button
            type="button"
            onClick={() => {
              setShowForm(false);
              setEditingId(null);
              setTitle("");
              setContent("");
            }}
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

      {chapters.length === 0 ? (
        <p>No chapters yet.</p>
      ) : (
        chapters.map(function (chapter) {
          return (
            <div
              key={chapter.chapter_id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "14px",
                marginBottom: "16px",
                border: "1px solid #e5e7eb",
              }}
            >
              <h3 style={{ fontSize: "26px", marginBottom: "8px" }}>
                Chapter {chapter.chapter_number}: {chapter.title}
              </h3>

              <p style={{ color: "#6b7280", marginBottom: "14px" }}>
                {chapter.content
                  ?.replace(/<[^>]+>/g, "") // remove HTML tags
                  .replace(/&nbsp;/g, " ") // fix spaces
                  .slice(0, 120)}
                ...
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => handleEditClick(chapter)}
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
                  className="print-hidden"
                  onClick={() => handleDeleteChapter(chapter.chapter_id)}
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

