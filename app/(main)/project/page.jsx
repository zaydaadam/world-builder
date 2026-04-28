"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ui/ImageUpload";

export default function ProjectPage() {
  const router = useRouter();

  // holds current project data
  const [project, setProject] = useState(null);

  // form state for editing project
  const [form, setForm] = useState({
    title: "",
    description: "",
    image_path: "",
  });

  // runs when page loads
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedProject = localStorage.getItem("currentProject");

    if (!savedUser) {
      router.push("/login");
      return;
    }

    if (!savedProject) {
      router.push("/dashboard");
      return;
    }

    const parsedProject = JSON.parse(savedProject);

    setProject(parsedProject);
    setForm({
      title: parsedProject.title || "",
      description: parsedProject.description || "",
      image_path: parsedProject.image_path || "",
    });
  }, [router]);

  // used for switching tabs
  function goTo(path) {
    router.push(path);
  }

  // updates form input values
  function handleChange(e) {
    const { name, value } = e.target;

    setForm(function (prev) {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  // saves uploaded image into form
  function handleImageUpload(image) {
    setForm(function (prev) {
      return {
        ...prev,
        image_path: image,
      };
    });
  }

  // sends update request to backend
  async function saveProject(e) {
    e.preventDefault();

    if (!project || !form.title.trim()) return;

    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(savedUser);

    try {
      const res = await fetch(`/api/projects/${project.project_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.user_id,
          title: form.title,
          description: form.description,
          image_path: form.image_path || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setProject(data);
      localStorage.setItem("currentProject", JSON.stringify(data));

      alert("Project updated");
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  }

  if (!project) return <p>Loading...</p>;

  return (
    <div>
      <h1 style={{ fontSize: "42px", marginBottom: "10px", fontWeight: "700" }}>
        {project.title}
      </h1>

      <p style={{ fontSize: "18px", marginBottom: "20px", color: "#4b5563" }}>
        {project.description}
      </p>

      {/* navigation tabs */}
      <div
        style={{
          display: "flex",
          marginBottom: "28px",
          backgroundColor: "#f3ede3",
          border: "1px solid #ddd6c8",
          borderRadius: "12px",
          overflow: "hidden",
          width: "fit-content",
        }}
      >
        <button
          onClick={() => goTo("/project")}
          style={{
            padding: "14px 28px",
            backgroundColor: "#ffffff",
            color: "#1f2937",
            borderRight: "1px solid #ddd6c8",
            fontWeight: "600",
            border: "none",
            cursor: "pointer",
          }}
        >
          Current Project
        </button>

        <button
          onClick={() => goTo("/project/chapters")}
          style={{
            padding: "14px 28px",
            backgroundColor: "transparent",
            color: "#1f2937",
            borderRight: "1px solid #ddd6c8",
            fontWeight: "600",
            border: "none",
            cursor: "pointer",
          }}
        >
          Chapters
        </button>

        <button
          onClick={() => goTo("/project/characters")}
          style={{
            padding: "14px 28px",
            backgroundColor: "transparent",
            color: "#1f2937",
            borderRight: "1px solid #ddd6c8",
            fontWeight: "600",
            border: "none",
            cursor: "pointer",
          }}
        >
          Characters
        </button>

        <button
          onClick={() => goTo("/project/map")}
          style={{
            padding: "14px 28px",
            backgroundColor: "transparent",
            color: "#1f2937",
            fontWeight: "600",
            border: "none",
            cursor: "pointer",
          }}
        >
          Map
        </button>
      </div>

      <div>
        <h2
          style={{
            fontSize: "28px",
            marginBottom: "16px",
            fontWeight: "700",
          }}
        >
          Edit Project
        </h2>

        <form onSubmit={saveProject}>
          <div style={{ marginBottom: "12px" }}>
            <label>Project Name</label>
            <br />
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              style={{ width: "300px", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label>Description</label>
            <br />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              style={{ width: "300px", height: "100px", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label>Image</label>
            <br />
            <ImageUpload onUpload={handleImageUpload} />

            {/* preview image */}
            {form.image_path && (
              <img
                src={form.image_path}
                alt="Preview"
                style={{
                  maxWidth: "300px",
                  display: "block",
                  marginTop: "10px",
                  borderRadius: "8px",
                }}
              />
            )}
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 18px",
              backgroundColor: "#2c558a",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
