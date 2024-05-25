import React from "react";
import ReactDOM from "react-dom/client";

import "./utils/globalConstant"

import { RouterProvider } from "react-router-dom";
import rouetr from "./router/router";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={rouetr} />
    </React.StrictMode>
);
