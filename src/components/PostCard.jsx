/* eslint-disable react/prop-types */
// 📁 components/PostCard.jsx
import { useNavigate } from "react-router";
import UserAvatar from "./UserAvatar";

export default function PostCard({ 
  post, 
  disableNavigation = false, 
  isSelected = false, 
  onSelectionChange 
}) {
  const navigate = useNavigate();

  function handleClick(e) {
    // If checkbox is clicked, don't navigate
    if (e.target.type === 'checkbox') {
      return;
    }
    
    if (!disableNavigation) {
      navigate(`/posts/${post.id}`);
    }
  }

  function handleCheckboxChange(e) {
    if (onSelectionChange) {
      onSelectionChange(post.id, e.target.checked);
    }
  }

  return (
    <article className="post-card" onClick={handleClick} style={{ cursor: disableNavigation ? "default" : "pointer" }}>
      {onSelectionChange && (
        <input 
          type="checkbox" 
          checked={isSelected}
          onChange={handleCheckboxChange}
          className="post-checkbox"
        />
      )}
      <UserAvatar uid={post.uid} />
      <img src={post.image} alt={post.caption} />
      <h2>{post.caption}</h2>
    </article>
  );
}