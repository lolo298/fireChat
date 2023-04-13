import React, { useEffect, useState } from "react";
import reactLogo from "../assets/react.svg";
import "@styles/Sidebar.scss";

export function Sidebar() {
  const [user, setUser] = useState<User>({
    "id": 0,
    "name": "",
    "username": "",
    "email": "",
    "address": {
      "street": "",
      "suite": "",
      "city": "",
      "zipcode": "",
      "geo": { "lat": "", "lng": "" }
    },
    "phone": "",
    "website": "",
    "company": {
      "name": "",
      "catchPhrase": "",
      "bs": ""
    }
  });

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/users/1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      if (isUser(data)) {
        setUser(data);
      } else {
        console.error("Error while fetching user");
      }
    })();
  }, []);

  return (
    <aside className="app-sidebar">
      <header>
        <img src={reactLogo} className="logo" alt="logo" />
        <h1>FireChat</h1>
      </header>
      <h3>{user.username + " " + user.email}</h3>
      <div className="menuItems">
        <p>Mon compte</p>
        <p>Mes conversations</p>
      </div>
    </aside>
  );
}

function isUser(arg: any): arg is User {
  return arg.id !== undefined;
}
