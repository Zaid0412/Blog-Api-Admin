import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import { useState } from "react";
import Footer from "./Components/Footer";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Outlet context={{ user, setUser }} />
      <Footer />
    </>
  );
}

export default App;
