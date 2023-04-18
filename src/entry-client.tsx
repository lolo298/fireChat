import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./Routes";
let root = document.getElementById("root") as HTMLElement;
ReactDOM.hydrateRoot(
  root,
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);
console.log("hydrated");
