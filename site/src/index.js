import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import GlobalStyle from "./styles/GlobalStyle.js";
import initializeGoogleMap from "./utils/initializeGoogleMap.js";

initializeGoogleMap();

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
    <ToastContainer position="bottom-right" />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
