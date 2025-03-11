import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <Navbar user={user} />
      <Outlet context={{ user, setUser }} />
    </>
  );
}

export default App;
