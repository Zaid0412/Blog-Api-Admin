import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const { user, setUser } = useOutletContext(); // Get user from context

  useEffect(() => {
    if (user) {
      const performLogout = async () => {
        if (!user || !user.refreshToken || !user.accessToken) {
          console.error("No valid user session found!");
          navigate("/login");
          return;
        }

        try {
          await fetch("http://localhost:4000/users/logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.accessToken}`, // Send accessToken in headers
            },
            body: JSON.stringify({ token: user.refreshToken }), // Send refreshToken in body
          });
        } catch (error) {
          console.error("Error logging out:", error);
        }

        setUser(null);
        navigate("/");
      };

      performLogout();
    }
  }, [navigate, user]);
  console.log(user);
  return <p>Logging out...</p>;
};

export default Logout;
