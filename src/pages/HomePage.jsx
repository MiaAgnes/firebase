// 📁 pages/HomePage.jsx
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [loading, setLoading] = useState(true);

  async function getPosts() {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/posts.json`;
      const response = await fetch(url);
      const data = await response.json();

      const postsArray = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      setPosts(postsArray);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  // I useEffect:
  useEffect(() => {
    getPosts();
  }, []);

  // ... eksisterende useEffect

  // Filtrer posts baseret på søgning
  const filteredPosts = posts.filter(post => post.caption.toLowerCase().includes(searchQuery.toLowerCase()));

  // Sortér posts
  filteredPosts.sort((postA, postB) => {
    if (sortBy === "createdAt") {
      return postB.createdAt - postA.createdAt; // Nyeste først
    }
    if (sortBy === "caption") {
      return postA.caption.localeCompare(postB.caption);
    }
    return 0;
  });

  async function handleBatchDelete() {
    const confirmDelete = window.confirm(`Er du sikker på du vil slette ${selectedPosts.size} posts?`);

    if (confirmDelete) {
      const deletePromises = Array.from(selectedPosts).map(postId =>
        fetch(`${import.meta.env.VITE_FIREBASE_DATABASE_URL}/posts/${postId}.json`, {
          method: "DELETE"
        })
      );

      try {
        await Promise.all(deletePromises);
        // Refresh posts list
        getPosts();
        setSelectedPosts(new Set());
      } catch (error) {
        console.error("Batch delete failed:", error);
      }
    }
  }

  function handleSelectionChange(postId, isSelected) {
    const newSelection = new Set(selectedPosts);
    if (isSelected) {
      newSelection.add(postId);
    } else {
      newSelection.delete(postId);
    }
    setSelectedPosts(newSelection);
  }

  // I JSX:
  if (loading) return <div>Loading...</div>;

  return (
    <section className="page">
      <form className="grid-filter" role="search">
        <label>
          Søg i captions
          <input type="text" placeholder="Søg..." onChange={e => setSearchQuery(e.target.value)} />
        </label>

        <label>
          Sortér efter
          <select onChange={e => setSortBy(e.target.value)}>
            <option value="createdAt">Dato</option>
            <option value="caption">Caption</option>
          </select>
        </label>
      </form>

      {selectedPosts.size > 0 && (
        <div className="btns">
          <button onClick={handleBatchDelete} className="btn-outline btn-delete">
            Slet valgte ({selectedPosts.size})
          </button>
        </div>
      )}
      <section className="grid">
        {filteredPosts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              isSelected={selectedPosts.has(post.id)}
              onSelectionChange={handleSelectionChange}
            />
        ))}
      </section>
    </section>
  );
}