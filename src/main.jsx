import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DbCalling from "./components/DbCalling";

createRoot(document.getElementById("root")).render(
  <>
    <DbCalling />
  </>,
);
