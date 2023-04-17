import Error from "./Error";
import "@styles/App.scss";
import { ChatBox, Sidebar } from "@components";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Sidebar />
              <ChatBox />
            </>
          }
        />
        <Route
          path="/logout"
          element={
            <>
              <Sidebar />
              <h1>Logout</h1>
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Error />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
