import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

export default function EditPost() {
  const { user } = useOutletContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      if (id) {
        try {
          const res = await fetch(`http://localhost:4000/articles/${id}`);
          if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
          const data = await res.json();
          if (user.user.id === data.article.userId) {
            setArticle(data.article);
          } else {
            navigate("/dashboard/posts");
          }
        } catch (error) {
          setError("Error fetching article.");
          console.error("Error fetching article:", error);
        }
      }
    };
    fetchArticle();
  }, [id]);

  useEffect(() => {
    if (article) {
      setTitle(article.title || "");
      setContent(article.content || "");
      setIsPublished(article.isPublished || false);
    }
  }, [article]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError("Title and content cannot be empty.");
      return;
    }

    try {
      if (user.user.id == article.user.id) {
        const res = await fetch(`http://localhost:4000/articles/${id}`, {
          method: "PUT",
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
      }

      if (!res.ok) throw new Error(`Failed to update: ${res.status}`);
      navigate("/dashboard/posts");
    } catch (error) {
      setError("Error updating article.");
      console.error("Error updating article:", error);
    }
  };

  console.log(article);

  return (
    <div className="new-post-page">
      <div
        className="article-back"
        onClick={() => navigate("/dashboard/posts")}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        Go Back
      </div>
      <h1>Edit Post</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Editor
          value={content}
          onEditorChange={setContent}
          apiKey="565m0vff87wh2wl6ne2ggojqntd1c9f9uxxsae08blrk0gfd"
          init={{
            skin: "oxide-dark",
            content_css: "dark",
            height: 500,
            menubar: true,
          }}
        />
        <div className="isPublished">
          <label className="checkbox-container">
            <p>Publish Post</p>
            <input
              className="custom-checkbox"
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <button type="submit" disabled={!title || !content}>
          Update Post
        </button>
      </form>
    </div>
  );
}
