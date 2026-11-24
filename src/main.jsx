import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DbCalling from "./components/DbCalling";
import Dashboard from "./components/Dashboard";
import Form from "./components/Form";

createRoot(document.getElementById("root")).render(
  <>
    {/* <DbCalling /> */}
    <Dashboard />
  </>,
);
