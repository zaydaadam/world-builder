"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Map from "@/components/features/Map";

export default function MapPage() {
  const router = useRouter();

  // holds current project
  const [project, setProject] = useState(null);

  // loads user and project when page opens
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

    setProject(JSON.parse(savedProject));
  }, [router]);

  // changes project tabs
  function goTo(path) {
    router.push(path);
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

      {/* project tabs */}
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
          className="print-hidden"
          onClick={() => goTo("/project")}
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
          Current Project
        </button>

        <button
          className="print-hidden"
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
          className="print-hidden"
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
          className="print-hidden"
          onClick={() => goTo("/project/map")}
          style={{
            padding: "14px 28px",
            backgroundColor: "#ffffff",
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
          Map
        </h2>

        <Map />
      </div>
    </div>
  );
}
