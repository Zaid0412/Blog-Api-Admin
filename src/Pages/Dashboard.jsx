import React, { useEffect, useRef, useState } from "react";
import { useOutletContext, useNavigate, Outlet } from "react-router-dom";

export default function Dashboard() {
  const { user } = useOutletContext();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [user, navigate]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const res = await fetch(
      `http://localhost:4000/articles/author/${user.user.id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );

    const data = await res.json();
    console.log(data);
    setPosts(data.articles);
  };

  return (
    <div className="dashboard">
      <Outlet context={{ posts, setPosts, getPosts, user }} />
    </div>
  );
}
