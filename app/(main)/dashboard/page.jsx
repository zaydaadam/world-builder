"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ui/ImageUpload";

export default function DashboardPage() {
  const router = useRouter();

  // state for projects list
  const [projects, setProjects] = useState([]);

  // controls showing the create form
  const [showForm, setShowForm] = useState(false);

  // form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // stores uploaded image path
  const [imagePath, setImagePath] = useState("");

  // runs once when page loads
  useEffect(function () {
    getProjects();
  }, []);

  // gets user from localStorage
  function getSavedUser() {
    const savedUser = localStorage.getItem("user");

    // if no user, send to login
    if (!savedUser) {
      router.push("/login");
      return null;
    }

    return JSON.parse(savedUser);
  }

  // fetch all projects for this user
  async function getProjects() {
    try {
      const user = getSavedUser();
      if (!user) return;

      const res = await fetch(`/api/projects?userId=${user.user_id}`);
      const data = await res.json();

      if (!res.ok) {
        // alert(data.message);
        return;
      }

      // save projects to state
      setProjects(data);
    } catch (error) {
      console.log("Get projects error:", error);
      // alert("Something went wrong");
    }
  }

  // handles creating a new project
  async function handleCreateProject(e) {
    e.preventDefault();

    const user = getSavedUser();
    if (!user) return;

    // simple check so empty title isn't allowed
    if (!title.trim()) return;

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.user_id,
          title: title,
          description: description,
          image_path: imagePath || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // alert(data.message);
        return;
      }

      // add new project to top of list
      setProjects(function (prev) {
        return [data, ...prev];
      });

      // reset form
      setTitle("");
      setDescription("");
      setImagePath("");
      setShowForm(false);
    } catch (error) {
      console.log("Create project error:", error);
      // alert("Something went wrong");
    }
  }

  // saves project in localStorage and opens it
  function handleOpenProject(project) {
    localStorage.setItem("currentProject", JSON.stringify(project));
    localStorage.setItem("activeProjectTab", "chapters");

    router.push("/project");
  }

  // deletes a project
  async function handleDeleteProject(projectId) {
    const confirmed = window.confirm("Delete this project?");
    if (!confirmed) return;

    const user = getSavedUser();
    if (!user) return;

    try {
      const res = await fetch(
        `/api/projects/${projectId}?userId=${user.user_id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        // alert(data.message);
        return;
      }

      // remove project from state
      setProjects(function (prev) {
        return prev.filter(function (project) {
          return project.project_id !== projectId;
        });
      });
    } catch (error) {
      console.log("Delete project error:", error);
      alert("Something went wrong");
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>Your Projects</h1>

      {/* show button when form is hidden */}
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

      {/* create project form */}
      {showForm && (
        <form
          onSubmit={handleCreateProject}
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #ddd6c8",
            marginBottom: "24px",
            maxWidth: "420px",
          }}
        >
          <h2 style={{ fontSize: "22px", marginBottom: "16px" }}>
            Create Project
          </h2>

          <input
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              marginBottom: "12px",
            }}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              minHeight: "90px",
              padding: "10px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              marginBottom: "12px",
            }}
          />

          <div style={{ marginBottom: "16px" }}>
            <ImageUpload onUpload={setImagePath} />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#1f2a44",
              color: "white",
              padding: "10px 16px",
              borderRadius: "8px",
              marginRight: "10px",
            }}
          >
            Save
          </button>

          <button
            type="button"
            onClick={() => {
              setShowForm(false);
              setTitle("");
              setDescription("");
              setImagePath("");
            }}
            style={{
              backgroundColor: "#f3f4f6",
              color: "#1f2937",
              padding: "10px 16px",
              borderRadius: "8px",
            }}
          >
            Cancel
          </button>
        </form>
      )}

      {/* if no projects */}
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

              {/* show image if exists */}
              {project.image_path && (
                <img
                  src={project.image_path}
                  alt="Project"
                  style={{
                    maxWidth: "300px",
                    display: "block",
                    marginBottom: "20px",
                  }}
                />
              )}

              <button
                type="button"
                onClick={() => handleOpenProject(project)}
                style={{
                  backgroundColor: "#1f2a44",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  marginRight: "8px",
                }}
              >
                Open
              </button>

              <button
                type="button"
                onClick={() => handleDeleteProject(project.project_id)}
                style={{
                  backgroundColor: "#f8d7da",
                  color: "#b91c1c",
                  padding: "6px 12px",
                  borderRadius: "6px",
                }}
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
