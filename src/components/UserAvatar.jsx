/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function UserAvatar({ uid }) {
  const [user, setUser] = useState({});

  useEffect(() => {
  async function getUser() {
    const url = `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/users/${uid}.json`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("User data:", data);
    setUser(data);
  }
  getUser();
}, [uid]); // KRITISK: uid i dependency array!

return (
  <div className="avatar">
    <img src={user?.image || "https://placehold.co/50x50.webp"} alt={user?.name || "User"} />
    <span>
      <h3>{user?.name || "loading..."}</h3>
      <p>{user?.title || ""}</p>
    </span>
  </div>
);
}