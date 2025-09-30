// 📁 pages/UpdatePage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import PostForm from "../components/PostForm";

export default function UpdatePage() {
  const [post, setPost] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getPost() {
      const url = `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/posts/${params.id}.json`;
      const response = await fetch(url);
      const postData = await response.json();
      setPost({ id: params.id, ...postData });
    }
    getPost();
  }, [params.id]);

  async function updatePost(formData) {
    const postToUpdate = {
      ...formData,
      uid: post.uid // Bevar original uid
    };

    const url = `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/posts/${params.id}.json`;
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(postToUpdate)
    });

    if (response.ok) {
      navigate(`/posts/${params.id}`);
    }
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Redigér Post</h1>
        <PostForm savePost={updatePost} post={post} />
      </div>
    </section>
  );
}