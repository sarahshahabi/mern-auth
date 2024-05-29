import React from "react";
import ReactDOM from "react-dom/client";

import "./utils/globalConstant";

import { RouterProvider } from "react-router-dom";
import rouetr from "./router/router";

import { Provider } from "react-redux";
import store from "./stores/store";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={rouetr} />
        </Provider>
    </React.StrictMode>
);
