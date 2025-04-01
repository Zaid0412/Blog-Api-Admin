import React, { useEffect, useState } from "react";
import { useOutletContext, useNavigate, Outlet } from "react-router-dom";

export default function Dashboard() {
  const { user, setUser } = useOutletContext();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.user?.id) {
      getPosts();
    }
  }, [user]);

  const getPosts = async () => {
    setLoading(true); // ✅ Start loading before fetching

    try {
      const res = await fetch(
        `http://localhost:4000/articles/author/${user?.user?.id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }

      const data = await res.json();
      setPosts(data.articles);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setTimeout(() => setLoading(false), 1000); // ✅ Artificial delay to show loader
    }
  };

  return (
    <div className="dashboard">
      <Outlet
        context={{ posts, setPosts, getPosts, user, loading, setLoading }}
      />
    </div>
  );
}
