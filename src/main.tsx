import "virtual:uno.css";
import "./base.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "@/App";

const basename = import.meta.env.BASE_URL ?? "/";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="min-h-screen antialiased flex flex-col">
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </div>
  </React.StrictMode>,
);
