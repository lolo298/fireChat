import { Profile } from "@components";
import styles from "@styles/Sidebar.module.scss";
import { SidebarLink } from "@components/SidebarLink";
import { auth } from "@utils/firebaseClient";
import { useRouter } from "next/router";

export function Sidebar() {
  const router = useRouter();

  async function handleLogout() {
    await auth.signOut();
    router.push("/login");
  }

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
