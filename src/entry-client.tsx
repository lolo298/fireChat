import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
let root = document.getElementById("root") as HTMLElement;
ReactDOM.hydrateRoot(
  root,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
console.log("hydrated");
