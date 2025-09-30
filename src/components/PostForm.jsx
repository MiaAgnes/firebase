/* eslint-disable react/prop-types */
// 📁 components/PostForm.jsx
import { useState, useEffect } from "react";

export default function PostForm({ savePost, post }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Hvis post prop findes, udfyld form
  useEffect(() => {
    if (post?.caption && post?.image) {
      setCaption(post.caption);
      setImage(post.image);
    }
  }, [post]);

  function handleSubmit(event) {
    event.preventDefault();

    // Simpel validation
    if (!caption.trim()) {
      setErrorMessage("Caption er påkrævet");
      return;
    }

    if (!image.trim()) {
      setErrorMessage("Billede URL er påkrævet");
      return;
    }

    // Clear error og gem
    setErrorMessage("");
    const formData = { caption: caption.trim(), image: image.trim() };
    savePost(formData);
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      {/* Eksisterende form felter */}

      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="btns">
        <button type="submit">Gem</button>
      </div>
    </form>
  );
}