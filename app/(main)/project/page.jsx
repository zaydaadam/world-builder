"use client";

import { useState } from "react";
import Chapters from "../../../components/Chapters";
import Characters from "../../../components/Characters";

export default function ProjectPage() {
  const [activeTab, setActiveTab] = useState("chapters");

  return (
    <div>
      <h1 style={{ fontSize: "42px", marginBottom: "10px", fontWeight: "700" }}>
        The Dragon’s Heir
      </h1>

      <p style={{ fontSize: "18px", marginBottom: "10px", color: "#4b5563" }}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi, voluptate.
      </p>


      <div
        style={{
          display: "flex",
          gap: "0",
          marginBottom: "28px",
          backgroundColor: "#f3ede3",
          border: "1px solid #ddd6c8",
          borderRadius: "12px",
          overflow: "hidden",
          width: "fit-content",
        }}
      >
        <button
          onClick={() => setActiveTab("chapters")}
          style={{
            padding: "14px 28px",
            backgroundColor: activeTab === "chapters" ? "#ffffff" : "transparent",
            color: "#1f2937",
            borderRight: "1px solid #ddd6c8",
            fontWeight: "600",
          }}
        >
          Chapters
        </button>

        <button
          onClick={() => setActiveTab("characters")}
          style={{
            padding: "14px 28px",
            backgroundColor: activeTab === "characters" ? "#ffffff" : "transparent",
            color: "#1f2937",
            fontWeight: "600",
          }}
        >
          Characters
        </button>
      </div>

      {activeTab === "chapters" && <Chapters />}
      {activeTab === "characters" && <Characters />}
    </div>
  );
}
