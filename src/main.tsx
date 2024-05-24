import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routes from "./components/routes/Routes.tsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <Routes />
  </React.StrictMode>
);
