import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
// import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

// registerServiceWorker();
ReactDOM.render(
    <Router>
      <App />
    </Router>,
  document.querySelector('#root')
);
