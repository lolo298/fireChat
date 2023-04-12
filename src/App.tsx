import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "@styles/App.scss";
import { ChatBox, Sidebar } from "@components";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <ChatBox />
    </div>
  );
}

export default App;
