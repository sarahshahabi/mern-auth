import React from "react";
import ReactDOM from "react-dom/client";

import "./utils/globalConstant";
import { Provider } from "react-redux";
import { persistor, store } from "./stores/store";
import { PersistGate } from "redux-persist/integration/react";

import { RouterProvider } from "react-router-dom";
import rouetr from "./router/router";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <PersistGate persistor={persistor}>
            <Provider store={store}>
                <RouterProvider router={rouetr} />
            </Provider>
        </PersistGate>
    </React.StrictMode>
);
