import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Logout from "./Components/Logout.jsx";
import LoginForm from "./Components/LoginForm.jsx";
import SignupForm from "./Components/SignupForm.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import ErrorElement from "./Pages/ErrorElement.jsx";
import NewPost from "./Components/NewPost.jsx";
import Posts from "./Components/Posts.jsx";
import EditPost from "./Components/editPost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/login", element: <LoginForm /> },
      { path: "/signup", element: <SignupForm /> },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          { path: "posts", element: <Posts /> },
          { path: "newPost", element: <NewPost /> },
          { path: "editPost/:id", element: <EditPost /> },
        ],
      },
      { path: "/newPost", element: <NewPost /> },
      { path: "*", element: <ErrorElement /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
