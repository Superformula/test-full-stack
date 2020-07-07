import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import GlobalStyle from "./styles/GlobalStyle.js";

const script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`;
script.defer = true;
script.async = true;
document.head.appendChild(script);

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
    <ToastContainer position="bottom-right" />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
