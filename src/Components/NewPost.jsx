import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function NewPost() {
  const { user } = useOutletContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess(null);

    if (!title || !content) {
      setErrors([{ path: "form", msg: "Title and content are required!" }]);
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/articles/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify({
          title,
          content,
          isPublished,
          userId: user.user.id,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors.errors);
        } else {
          throw new Error(data.message || "Failed to create post!");
        }
        return;
      }

      setSuccess("Post created successfully! Redirecting...");
      setTimeout(() => navigate("/dashboard/posts"), 1250);
    } catch (err) {
      setErrors([{ path: "server", msg: err.message }]);
    }
  };

  const handleGoBack = () => {
    navigate("/dashboard/posts");
  };

  return (
    <div className="new-post-page">
      <div className="article-back" onClick={handleGoBack}>
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
          className="lucide lucide-arrow-left"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        Go Back
      </div>
      <h1>Create Post</h1>
      <form>
        {errors.map((error, index) => (
          <p key={index} className="error-msg" style={{ color: "red" }}>
            {error.msg}
          </p>
        ))}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Editor
          value={content}
          onEditorChange={(newContent) => setContent(newContent)}
          apiKey="565m0vff87wh2wl6ne2ggojqntd1c9f9uxxsae08blrk0gfd"
          init={{
            skin: "oxide-dark",
            content_css: "dark",
            width: "100%",
            height: 500,
            menubar: true,
            toolbar_sticky: true,
            resize: true,
            branding: false,
            plugins: [
              "link image media table mergetags",
              "lists checklist numlist bullist",
              "visualblocks wordcount preview fullscreen",
            ],
            toolbar:
              "undo redo | formatselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat",
          }}
          initialValue="Content"
        />

        <div className="isPublished">
          <label className="checkbox-container">
            <p>Publish Post</p>
            <input
              className="custom-checkbox"
              type="checkbox"
              defaultChecked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <button onClick={handleSubmit} disabled={!title || !content}>
          Create Post
        </button>
      </form>
    </div>
  );
}
