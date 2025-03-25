import { useNavigate, useOutletContext } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import PostsTable from "./PostsTable";
import "ldrs/tailspin";

function Posts() {
  const { user, posts, setPosts, getPosts, loading, setLoading } =
    useOutletContext();
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const res = await fetch(
        `http://localhost:4000/articles/author/${user.user.id}/search?searchWord=${searchRef.current.value}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );

      const data = await res.json();
      setPosts(data.articles);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    setLoading(true); // Start loading before fetching posts
    getPosts().finally(() => setLoading(false)); // Stop loading after fetch
  }, []);

  return (
    <>
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

      {loading ? (
        // Default values shown
        <div class="loader"></div>
      ) : posts.length > 0 ? (
        <PostsTable posts={posts} getPosts={getPosts} user={user} />
      ) : (
        <div
          className="no-posts-div"
          onClick={() => navigate("/dashboard/newPost")}
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
            className="lucide lucide-square-pen"
          >
            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
          </svg>
          <h1>No Posts Found!</h1>
        </div>
      )}
    </>
  );
}

export default Posts;
