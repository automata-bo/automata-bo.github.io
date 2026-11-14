import React from "react";
import { createRoot } from "react-dom/client";
import WeddingInvitationDemo from "./WeddingInvitationDemo";
import "./index.css";

function App() {
  return <WeddingInvitationDemo />;
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
