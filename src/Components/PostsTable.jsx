import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const formatDate = (date) => {
  return moment(date).format("DD. MMMM YYYY");
};

export default function PostsTable({ posts, getPosts, user }) {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/dashboard/editPost/${id}`);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:4000/articles/${id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${user.accessToken}` },
    });

    const data = await res.json();
    console.log(data);

    // navigate("/dashboard");
    getPosts();
  };

  return (
    <table>
      <tr className="headers">
        <th>Title</th>
        <th>Author</th>
        <th>Created At</th>
        <th>Published</th>
        <th></th>
        <th></th>
      </tr>
      {posts.map((post) => {
        return (
          <tr className="table-row" key={post.id}>
            <th>{post.title}</th>
            <th>{post.user.username}</th>
            <th>{formatDate(post.createdAt)}</th>
            <th>{post.isPublished ? "Yes" : "No"}</th>
            <th className="btn">
              <button onClick={() => handleEdit(post.id)}>
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
                  className="lucide lucide-file-pen-line"
                >
                  <path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
                  <path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                  <path d="M8 18h1" />
                </svg>
              </button>
            </th>
            <th className="btn">
              <button onClick={(e) => handleDelete(post.id)}>
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
                  className="lucide lucide-trash-2"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
              </button>
            </th>
          </tr>
        );
      })}
    </table>
  );
}
