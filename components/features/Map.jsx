"use client";

import { useEffect, useState } from "react";
import ImageUpload from "@/components/ui/ImageUpload";
import MapMarkers from "@/components/ui/MapMarkers";

export default function Map() {
  const [map, setMap] = useState(null);
  const [image, setImage] = useState("");

  useEffect(function () {
    getMap();
  }, []);

  // get or create map for current project
  async function getMap() {
    try {
      const savedProject = localStorage.getItem("currentProject");
      if (!savedProject) return;

      const project = JSON.parse(savedProject);

      setImage(project.image_path || "");

      const res = await fetch(`/api/maps?projectId=${project.project_id}`);
      const data = await res.json();

      if (!res.ok) {
        // alert(data.message);
        return;
      }

      if (data) {
        setMap(data);
      } else {
        await createMap(project, project.image_path || "");
      }
    } catch (error) {
      console.log(error);
      // alert("something went wrong");
    }
  }

  // create map row
  async function createMap(project, imagePath) {
    const res = await fetch("/api/maps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_id: project.project_id,
        map_name: "Main Map",
        image_path: imagePath || null,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      // alert(data.message);
      return;
    }

    setMap(data);
  }

  // update project image after upload
  async function handleUpload(url) {
    try {
      const savedProject = localStorage.getItem("currentProject");
      const savedUser = localStorage.getItem("user");

      if (!savedProject || !savedUser) return;

      const project = JSON.parse(savedProject);
      const user = JSON.parse(savedUser);

      const res = await fetch(`/api/projects/${project.project_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.user_id,
          title: project.title,
          description: project.description,
          image_path: url,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // alert(data.message);
        return;
      }

      localStorage.setItem("currentProject", JSON.stringify(data));
      setImage(data.image_path || "");

      if (map) {
        setMap({
          ...map,
          image_path: data.image_path,
        });
      }

      if (!map) {
        await createMap(data, data.image_path || "");
      }
    } catch (error) {
      console.log(error);
      // alert("something went wrong");
    }
  }

  return (
    <div>
      <p style={{ marginBottom: "12px", color: "#6b7280" }}>
        Upload a map and place markers on it.
      </p>

      {!image && <ImageUpload onUpload={handleUpload} />}

      {image && map && (
        <div
          style={{
            marginTop: "16px",
            width: "100%",
            maxWidth: "100%",
            overflow: "visible",
          }}
        >
          <MapMarkers mapImage={image} mapId={map.map_id} />
        </div>
      )}
    </div>
  );
}
