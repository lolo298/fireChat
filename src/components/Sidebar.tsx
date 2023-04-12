import reactLogo from "../assets/react.svg";
import "@styles/Sidebar.scss";

export function Sidebar() {
  return (
    <aside className="app-sidebar">
      <header>
        <img src={reactLogo} className="logo" alt="logo" />
        <h1>FireChat</h1>
      </header>
      <div className="menuItems">
        <p>Mon compte</p>
        <p>Mes conversations</p>
      </div>
    </aside>
  );
}
