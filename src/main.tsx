import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routes from "./components/routes/Routes.tsx";
import { Toaster } from "react-hot-toast";
import AppContext from "./context/AppContext.tsx";
import { ConfirmProvider } from "material-ui-confirm";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster position="bottom-right" reverseOrder={false} />
    <ConfirmProvider>
      <AppContext>
        <Routes />
      </AppContext>
    </ConfirmProvider>
  </React.StrictMode>
);
