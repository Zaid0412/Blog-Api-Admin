import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function NewPost() {
  const { user } = useOutletContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublised] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title);
    console.log(content);
    console.log(isPublished);

    const res = await fetch(`http://localhost:4000/articles/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ Add this for JSON data
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
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Success:", data);
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
      <h1>Create Post</h1>
      <form>
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
            skin: "oxide-dark", // UI dark mode
            content_css: "dark", // Editor content dark mode
            width: "100%", // Ensure proper width
            height: 500, // Adjust height
            menubar: true, // Enable menu
            toolbar_sticky: true, // Keep toolbar fixed
            resize: true, // Allow resizing
            branding: false, // Remove TinyMCE branding
            // width: 800,
            menu: {
              file: {
                title: "File",
                items:
                  "newdocument restoredraft | preview | importword exportpdf exportword | print | deleteallconversations",
              },
              edit: {
                title: "Edit",
                items:
                  "undo redo | cut copy paste pastetext | selectall | searchreplace",
              },
              view: {
                title: "View",
                items:
                  "code revisionhistory | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments",
              },
              insert: {
                title: "Insert",
                items:
                  "image link media addcomment pageembed codesample inserttable | math | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime",
              },
              format: {
                title: "Format",
                items:
                  "bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat",
              },
              tools: {
                title: "Tools",
                items:
                  "spellchecker spellcheckerlanguage | a11ycheck code wordcount",
              },
              table: {
                title: "Table",
                items:
                  "inserttable | cell row column | advtablesort | tableprops deletetable",
              },
              help: { title: "Help", items: "help" },
            },
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
              "ai",
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
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            mergetags_list: [
              { value: "First.Name", title: "First Name" },
              { value: "Email", title: "Email" },
            ],
            ai_request: (request, respondWith) =>
              respondWith.string(() =>
                Promise.reject("See docs to implement AI Assistant"),
              ),
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
              onChange={(e) => {
                setIsPublised(e.target.checked);
              }}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <button onClick={handleSubmit}>Create Post</button>
      </form>
    </div>
  );
}
