import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSignupBtn = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setErrors([]); // Clear previous errors
    setSuccess(null); // Clear success message

    if (!username || !email || !password || !confPassword) {
      setErrors([{ path: "form", msg: "All fields are required!" }]);
      return;
    }

    if (password !== confPassword) {
      setErrors([{ path: "confPassword", msg: "Passwords do not match!" }]);
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          conf_password: confPassword,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error(data.message || "Signup failed!");
      }

      if (data.errors) {
        setErrors(data.errors.errors);
        console.log(data.errors.errors);
      } else {
        setSuccess("Signup successful! Redirecting to login...");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfPassword("");

        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect after 2 seconds
      }
    } catch (err) {
      setErrors([{ path: "server", msg: err.message }]);
    }
  };

  return (
    <form className="signup-form">
      <h1>Create an Account</h1>
      <p>
        Already have an account? <a href="/login">Log In!</a>
      </p>

      {/* General Error Messages */}
      {errors.map((error, index) =>
        error.path === "form" || error.path === "server" ? (
          <p key={index} className="error-msg" style={{ color: "red" }}>
            {error.msg}
          </p>
        ) : null,
      )}

      {success && <p style={{ color: "green" }}>{success}</p>}

      <input
        type="text"
        placeholder="Username"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {errors.map((error, index) =>
        error.path === "username" ? (
          <p key={index} className="error-msg" style={{ color: "red" }}>
            {error.msg}
          </p>
        ) : null,
      )}

      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.map((error, index) =>
        error.path === "email" ? (
          <p key={index} className="error-msg" style={{ color: "red" }}>
            {error.msg}
          </p>
        ) : null,
      )}

      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.map((error, index) =>
        error.path === "password" ? (
          <p key={index} className="error-msg" style={{ color: "red" }}>
            {error.msg}
          </p>
        ) : null,
      )}

      <input
        type="password"
        placeholder="Confirm Password"
        required
        value={confPassword}
        onChange={(e) => setConfPassword(e.target.value)}
      />
      {errors.map((error, index) =>
        error.path === "confPassword" ? (
          <p key={index} className="error-msg" style={{ color: "red" }}>
            {error.msg}
          </p>
        ) : null,
      )}

      <button onClick={handleSignupBtn}>Sign Up</button>
    </form>
  );
}

export default SignupForm;
