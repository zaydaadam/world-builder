"use client";

export default function ImageUpload({ onUpload }) {
  function handleChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    onUpload(url);
  }

  return <input type="file" accept="image/*" onChange={handleChange} />;
}
