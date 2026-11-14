import React from "react";
import { createRoot } from "react-dom/client";
import DigitalStorytellingDemo from "./DigitalStorytellingDemo";
import "./index.css";

function App() {
  return <DigitalStorytellingDemo />;
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
