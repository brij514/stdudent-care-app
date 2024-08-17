import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { IdProvider } from "./context/IdContext.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
      <LoadingProvider>
        <IdProvider>
        <App />
        </IdProvider>
      </LoadingProvider>
        
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
