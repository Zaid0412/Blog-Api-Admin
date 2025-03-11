import React, { useEffect, useRef, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import PostsTable from "../Components/PostsTable";

export default function Dashboard() {
  const { user } = useOutletContext();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);

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

  const handleSearch = async (e) => {
    e.preventDefault();
    // search?searchWord=${e.target.value}
    const res = await fetch(
      `http://localhost:4000/articles/author/${user.user.id}/search?searchWord=${searchRef.current.value}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );

    const data = await res.json();
    setPosts(data.articles);
  };

  return (
    <div className="dashboard">
      <div className="head">
        <h1>Posts</h1>

        <form>
          <input
            type="text"
            placeholder="Search..."
            ref={searchRef}
            onChange={handleSearch}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </form>
      </div>
      {posts.length > 0 ? (
        <PostsTable posts={posts} getPosts={getPosts} user={user} />
      ) : (
        <div className="no-posts-div">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-square-pen"
          >
            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
          </svg>
          <h1>No Posts Found!</h1>
        </div>
      )}
    </div>
  );
}
