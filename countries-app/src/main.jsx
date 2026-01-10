import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { ThemeProvider } from "./context/ThemeContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </ThemeProvider>
  </React.StrictMode>
);
