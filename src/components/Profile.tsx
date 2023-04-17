import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@styles/Profile.scss";

export function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/users/1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data: UserResult = await response.json();
      if (data.results !== null) {
        setUser(data.results[0]);
      } else {
        console.error("Error while fetching user");
      }
    })();
  }, []);

  return (
    <Link to="/" className="profil">
      <img src={user?.picture.large} alt="PP" />
      <h3>{user?.login.username}</h3>
    </Link>
  );
}
