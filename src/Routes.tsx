import "@styles/App.scss";
import { ChatBox, Sidebar } from "@components";
import { Route, Routes as BrowserRoutes } from "react-router-dom";
import { Home, Logout, Error } from "@pages";

export function Routes() {
  return (
    <div className="App">
      <BrowserRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error />} />
      </BrowserRoutes>
    </div>
  );
}
