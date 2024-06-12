import { Outlet } from "react-router";
import Header from "./components/Header";

function app() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}

export default app;
