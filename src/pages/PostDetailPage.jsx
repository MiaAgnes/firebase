// 📁 pages/PostDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import PostCard from "../components/PostCard";
import ConfirmDialog from "../components/ConfirmDialog";

export default function PostDetailPage() {
  const [post, setPost] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  // Mock currentUser - skal erstattes med rigtig authentication senere
  const currentUser = {
    uid: "fTs84KRoYw5pRZEWCq2Z", // Hardcoded til demo
    isAdmin: false // Sæt til true for admin test
  };

  useEffect(() => {
    async function getPost() {
      const url = `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/posts/${params.id}.json`;
      const response = await fetch(url);
      const postData = await response.json();
      setPost({ id: params.id, ...postData });
    }
    getPost();
  }, [params.id]);

  function handleUpdate() {
    navigate(`/posts/${params.id}/update`);
  }

  function handleDeleteClick() {
    // Check if current user owns the post
    if (post.uid !== currentUser.uid && !currentUser.isAdmin) {
      alert("Du kan kun slette dine egne posts");
      return;
    }
    
    setShowDeleteDialog(true);
  }

  function confirmDelete() {
    setShowDeleteDialog(false);
    handleDelete();
  }

  async function handleDelete() {
    setIsDeleting(true);

    try {
      const url = `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/posts/${params.id}.json`;
      const response = await fetch(url, {
        method: "DELETE"
      });

      if (response.ok) {
        // Success - navigate away
        navigate("/");
      } else {
        alert("Der opstod en fejl ved sletning");
      }
    } catch (error) {
      console.error("Netværksfejl:", error);
      alert("Netværksfejl - prøv igen");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <section className="page" id="post-page">
      <div className="container">
        {post.id && <PostCard post={post} disableNavigation={true} />}

        <div className="btns">
          <button onClick={handleUpdate} className="btn-outline">
            Redigér
          </button>
          {(post.uid === currentUser.uid || currentUser.isAdmin) && (
            <button onClick={handleDeleteClick} className="btn-outline btn-delete" disabled={isDeleting}>
              {isDeleting ? "Sletter..." : "Slet"}
            </button>
          )}
        </div>
      </div>

      {showDeleteDialog && (
        <ConfirmDialog 
          isOpen={showDeleteDialog}
          title="Slet post"
          message="Er du sikker på du vil slette dette post?"
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteDialog(false)}
        />
      )}
    </section>
  );
}