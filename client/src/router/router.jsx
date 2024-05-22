import { createBrowserRouter } from "react-router-dom";

import App from "../App.jsx";
import Home from "../pages/Home";
import About from "../pages/About";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";

const rouetr = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "sign-in",
                element: <SignIn />,
            },
            {
                path: "sign-up",
                element: <SignUp />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
        ],
    },
]);

export default rouetr;
