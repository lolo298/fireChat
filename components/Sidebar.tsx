import { Profile } from "@components";
import styles from "@styles/Sidebar.module.scss";
import { SidebarLink } from "@components/SidebarLink";

export function Sidebar() {
  return (
    <aside className={styles["app-sidebar"]}>
      <header>
        <img src="/react.svg" className={styles.logo} alt="logo" />
        <h1>FireChat</h1>
      </header>
      <div className={styles.menuItems}>
        <Profile />
        <p>Mon compte</p>
        <p>Mes conversations</p>
        <SidebarLink href="/account">Mon compte</SidebarLink>
        <button className={styles.btn} onClick={handleLogout}>
          Déconnexion
        </button>
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
