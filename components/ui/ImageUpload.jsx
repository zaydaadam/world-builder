"use client";

export default function ImageUpload({ onUpload }) {
  // handles file selection
  function handleChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    // convert file to base64 and send it back
    reader.onloadend = function () {
      onUpload(reader.result);
    };

    reader.readAsDataURL(file);
  }

  return <input type="file" accept="image/*" onChange={handleChange} />;
}
