"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Characters from "@/components/features/Characters";

export default function CharactersPage() {
  const router = useRouter();
  
  const [project, setProject] = useState(null);

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

  function goTo(path) {
    router.push(path);
  }

  if (!project) return <p>Loading...</p>;

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "8px",
            fontWeight: "700",
          }}
        >
          {project.title}
        </h1>

        <p style={{ color: "#6b7280", fontSize: "18px" }}>
          {project.description}
        </p>
      </div>

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
        <Tab
          text="Current Project"
          active={false}
          className="print-hidden"
          onClick={() => goTo("/project")}
        />
        <Tab
          text="Chapters"
          active={false}
          className="print-hidden"
          onClick={() => goTo("/project/chapters")}
        />
        <Tab
          text="Characters"
          active={true}
          className="print-hidden"
          onClick={() => goTo("/project/characters")}
        />
        <Tab
          text="Map"
          active={false}
          last
          className="print-hidden"
          onClick={() => goTo("/project/map")}
        />
      </div>

      <Characters />
    </div>
  );
}

function Tab({ text, active, onClick, last }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "14px 28px",
        backgroundColor: active ? "#ffffff" : "transparent",
        color: "#1f2937",
        border: "none",
        borderRight: last ? "none" : "1px solid #ddd6c8",
        fontWeight: "600",
        cursor: "pointer",
      }}
    >
      {text}
    </button>
  );
}
