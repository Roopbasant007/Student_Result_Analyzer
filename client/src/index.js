import React from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById('root');
const app = createRoot(container); // createRoot(container!) if you use TypeScript
app.render( <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</BrowserRouter>,);

reportWebVitals();