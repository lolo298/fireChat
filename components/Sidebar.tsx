import { Profile } from "@components";
import styles from "@styles/Sidebar.module.scss";
import { User } from "firebase/auth";
import Link from "next/link";

export function Sidebar({ user }) {
  return (
    <aside className={styles["app-sidebar"]}>
      <header>
        <img src="/react.svg" className={styles.logo} alt="logo" />
        <h1>FireChat</h1>
      </header>
      <div className={styles.menuItems}>
        <Profile user={user} />
        <p>Mon compte</p>
        <p>Mes conversations</p>
        <button onClick={handleLogout}>Déconnexion</button>
      </div>
    </aside>
  );
}

async function handleLogout() {
  const res = await fetch("/api/logout", {
    method: "POST",
  });
  let data = await res.json();
  if (data.success) {
    window.location.href = "/";
  } else {
    console.error(data.message);
  }
}

function isUser(arg: any): arg is User {
  return arg.uid !== undefined;
}
