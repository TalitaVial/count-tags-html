import React from "react";
import ReactDOM from "react-dom/client";
import HtmlAnalyzer from "./pages/htmlAnalyzer";
import "./styles/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HtmlAnalyzer />
  </React.StrictMode>
);
