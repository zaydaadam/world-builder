"use client";

import { useState } from "react";
import ImageUpload from "@/components/ui/ImageUpload";
import MapMarkers from "@/components/ui/MapMarkers";

export default function PracticePage() {
  const [image, setImage] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <ImageUpload onUpload={setImage} />

        {image && (
          <div style={{ marginTop: "16px" }}>
            <MapMarkers mapImage={image} />
          </div>
        )}
      </div>
    </div>
  );
}
