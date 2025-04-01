import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import { useState, useEffect } from "react";
import Footer from "./Components/Footer";

function App() {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Outlet context={{ user, setUser }} />
      <Footer />
    </>
  );
}

export default App;
