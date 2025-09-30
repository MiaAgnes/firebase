// 📁 pages/CreatePage.jsx
import PostForm from "../components/PostForm";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
  const navigate = useNavigate();

  async function createPost(formData) {
    const newPost = {
      ...formData,
      uid: "fTs84KRoYw5pRZEWCq2Z",
      createdAt: Date.now()
    };

    const url = `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/posts.json`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newPost)
    });

    if (response.ok) {
      navigate("/");
    }
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Opret Post</h1>
        <PostForm savePost={createPost} />
      </div>
    </section>
  );
}