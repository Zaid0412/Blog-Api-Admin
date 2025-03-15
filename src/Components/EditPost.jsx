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
  const [isPublished, setIsPublised] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      if (id) {
        try {
          const res = await fetch(`http://localhost:4000/articles/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // authorization: `Bearer ${user?.accessToken}`,
            },
          });

          if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status}`);
          }
          const data = await res.json();

          if (user.user.id == data.article.userId) {
            setArticle(data.article);
          } else navigate("/dashboard/posts");
        } catch (error) {
          console.error("Error fetching article:", error);
        }
      }
    };

    fetchArticle();
  }, [id]);

  // ✅ Ensure article exists before setting state
  useEffect(() => {
    if (article) {
      setTitle(article.title || "");
      setContent(article.content || "");
      setIsPublised(article.isPublished || false);
    }
  }, [article]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:4000/articles/${id}`, {
      method: "PUT", // ✅ Use PUT for updating an existing article
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

    if (!res.ok) {
      console.error(`Failed to update: ${res.status}`);
      return;
    }

    navigate("/dashboard/posts");
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
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
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
              "anchor",
              "autolink",
              "charmap",
              "codesample",
              "emoticons",
              "image",
              "link",
              "lists",
              "media",
              "searchreplace",
              "table",
              "visualblocks",
              "wordcount",
              "checklist",
              "mediaembed",
              "casechange",
              "export",
              "formatpainter",
              "pageembed",
              "a11ychecker",
              "tinymcespellchecker",
              "permanentpen",
              "powerpaste",
              "advtable",
              "advcode",
              "editimage",
              "advtemplate",
              "mentions",
              "tinycomments",
              "tableofcontents",
              "footnotes",
              "mergetags",
              "autocorrect",
              "typography",
              "inlinecss",
              "markdown",
              "importword",
              "exportword",
              "exportpdf",
            ],
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | " +
              "link image media table mergetags | addcomment showcomments | " +
              "spellcheckdialog a11ycheck typography | align lineheight | " +
              "checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
          }}
        />

        <div className="isPublished">
          <label className="checkbox-container">
            <p>Publish Post</p>
            <input
              className="custom-checkbox"
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublised(e.target.checked)}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}
