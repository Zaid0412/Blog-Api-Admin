import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function LoginForm() {
  const { user, setUser } = useOutletContext();
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleLoginBtn = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess(null);

    const username = usernameInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (!username || !password) {
      setErrors([{ path: "form", msg: "Both fields are required!" }]);
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors.errors);
        } else {
          throw new Error(data.message || "Login failed!");
        }
        return;
      }

      setSuccess("Login successful! Redirecting...");
      // console.log("Received user data:", data); // ✅ This will show correct data
      localStorage.setItem("user", JSON.stringify(data));
      console.log("User set in localStorage");
      setUser(data); // ✅ Updates state, but user will still be null here

      setTimeout(() => navigate("/dashboard/posts"), 1250);
    } catch (err) {
      setErrors([{ path: "server", msg: err.message }]);
    }
  };

  return (
    <form className="login-form">
      <h1>Welcome Back!</h1>
      <p>
        Don't have an account? <a href="/signup">Sign Up!</a>
      </p>

      {errors.map((error, index) =>
        error.path === "form" || error.path === "server" ? (
          <p key={index} className="error-msg" style={{ color: "red" }}>
            {error.msg}
          </p>
        ) : null,
      )}

      {success && <p style={{ color: "green" }}>{success}</p>}

      <input
        ref={usernameInputRef}
        type="text"
        placeholder="Username"
        required
      />
      {errors.map((error, index) =>
        error.path === "username" ? (
          <p key={index} className="error-msg" style={{ color: "red" }}>
            {error.msg}
          </p>
        ) : null,
      )}

      <input
        ref={passwordInputRef}
        type="password"
        placeholder="Password"
        required
      />
      {errors.map((error, index) =>
        error.path === "password" ? (
          <p key={index} className="error-msg" style={{ color: "red" }}>
            {error.msg}
          </p>
        ) : null,
      )}

      <button onClick={handleLoginBtn}>Login</button>
    </form>
  );
}
