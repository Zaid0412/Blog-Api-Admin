import React from "react";

export default function Navbar({ user }) {
  return (
    <nav className="navbar">
      <h1>Postly</h1>

      {user ? (
        <div className="paste-button">
          <button className="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
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

          {/* Dropdown content */}
          <div className="dropdown-content">
            <a id="top" href="/logout">
              Logout
            </a>
            {/* The rest of the links are commented out for now */}
            {/* <a id="middle" href="/users">
           All Users
         </a>
         <a id="bottom" href="/logout">
           Logout
         </a> */}
          </div>
        </div>
      ) : (
        // ✅ Show login/signup buttons if no user is logged in
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
