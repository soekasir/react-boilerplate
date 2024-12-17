/* eslint-disable no-undef */
import "reflect-metadata";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./styles/global.css";
import { Router } from "./pages";

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderReactDom = () => {
  root.render(
    <React.StrictMode>
      <div style={{ overflow: "hidden" }}>
        <Router />
      </div>
    </React.StrictMode>
  );
};

renderReactDom();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
