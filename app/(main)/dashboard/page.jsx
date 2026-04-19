"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  // project list
  const [projects, setProjects] = useState([
    {
      project_id: 1,
      title: "The Dragon’s Heir",
      description: "Fantasy world with kingdoms and war.",
    },
    {
      project_id: 2,
      title: "Second Project",
      description: "Another story idea.",
    },
  ]);

  // show/hide form
  const [showForm, setShowForm] = useState(false);

  // form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleCreateProject(e) {
    e.preventDefault();

    if (!title.trim()) return;

    const newProject = {
      project_id: Date.now(),
      title: title,
      description: description,
    };

    setProjects(function (prev) {
      return [...prev, newProject];
    });

    setTitle("");
    setDescription("");
    setShowForm(false);
  }

  function handleOpenProject(project) {
    // save selected project
    localStorage.setItem("currentProject", JSON.stringify(project));

    // default tab when project first opens
    localStorage.setItem("activeProjectTab", "chapters");

    // go to project page
    router.push("/project");
  }

  function handleDeleteProject(projectId) {
    const confirmed = window.confirm("Delete this project?");
    if (!confirmed) return;

    setProjects(function (prev) {
      return prev.filter(function (project) {
        return project.project_id !== projectId;
      });
    });
  }

  return (
    <div>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>Your Projects</h1>

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
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
      )}

      {showForm && (
        <form onSubmit={handleCreateProject} style={{ marginBottom: "20px" }}>
          <div>
            <input
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div style={{ marginTop: "10px" }}>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button type="submit" style={{ marginTop: "10px" }}>
            Save
          </button>

          <button
            type="button"
            onClick={() => {
              setShowForm(false);
              setTitle("");
              setDescription("");
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </form>
      )}

      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        projects.map(function (project) {
          return (
            <div
              key={project.project_id}
              style={{
                background: "white",
                padding: "16px",
                borderRadius: "10px",
                marginBottom: "12px",
              }}
            >
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <button type="button" onClick={() => handleOpenProject(project)}>
                Open
              </button>

              <button
                type="button"
                onClick={() => handleDeleteProject(project.project_id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}
