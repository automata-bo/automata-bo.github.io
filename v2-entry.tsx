import React from "react";
import { createRoot } from "react-dom/client";
import V2App from "./v2-main";
import "./index.css";

createRoot(document.getElementById("root")!).render(<React.StrictMode><V2App /></React.StrictMode>);
