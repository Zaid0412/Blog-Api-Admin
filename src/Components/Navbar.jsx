import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const logout = async () => {
    if (!user || !user.refreshToken || !user.accessToken) {
      console.error("No valid user session found!");
      return;
    }

    try {
      setTimeout(async () => {
        const response = await fetch("http://localhost:4000/users/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`, // Send accessToken in headers
          },
          body: JSON.stringify({ token: user.refreshToken }), // Send refreshToken in body
        });

        if (response.ok) {
          setUser(null);
          navigate("/");
        } else {
          console.error("Logout failed!", await response.json());
        }
      }, 1000);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.classList.toggle("light");
  }, [darkMode]);

  return (
    <nav className="navbar">
      <h1 onClick={() => navigate("/dashboard/posts")}>Postly</h1>
      <input
        type="checkbox"
        className="theme-checkbox"
        onChange={handleTheme}
        checked={darkMode}
      ></input>
      {user ? (
        <>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
          <div className="paste-button">
            <button className="button">
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
                className="lucide lucide-circle-user-round"
              >
                <path d="M18 20a6 6 0 0 0-12 0" />
                <circle cx="12" cy="10" r="4" />
                <circle cx="12" cy="12" r="10" />
              </svg>{" "}
              {user.user.username} &nbsp; ▼
            </button>

            <div className="dropdown-content">
              <Link to={"/dashboard/posts"} id="top">
                Posts
              </Link>
              <Link to={"/dashboard/newPost"} id="top">
                Create Post
              </Link>
              {/* <a id="top" onClick={logout}>
              Logout
            </a> */}
            </div>
          </div>
        </>
      ) : (
        <>
          <a href="/login">
            <button className="login-btn">Login</button>
          </a>
          <a href="/signup">
            <button className="signup-btn">Sign Up</button>
          </a>
        </>
      )}
    </nav>
  );
}
