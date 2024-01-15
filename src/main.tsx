import { emit } from "@tauri-apps/api/event";
import React from "react";
import ReactDOM from "react-dom/client";
import { onEventShowMenu } from "tauri-plugin-context-menu";
import App from "./App";
import "./index.css";

if (window?.__TAURI_METADATA__) {
  onEventShowMenu("contextmenu", async () => ({
    items: [
      {
        label: "Reload window",

        event() {
          location.reload();
        },
      },
      {
        label: "Check for updates",
        async event() {
          await emit("tauri://update");
        },
      },
    ],
  }));
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
