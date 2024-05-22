import { Link } from "react-router-dom";
function Header() {
    return (
        <div className="bg-slate-200">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3 ">
                <ul className="flex justify-between gap-5">
                    <Link to={"/"}>
                        <li>Home</li>
                    </Link>

                    <Link to={"/about"}>
                        <li>About us</li>
                    </Link>

                    <Link to={"/sign-in"}>
                        <li>Sign In</li>
                    </Link>
                </ul>

                <Link to={"/"}>
                    <h1 className="font-bold border-solid border-2 border-slate-800	px-3 py-1 rounded bg-slate-800 text-slate-50">
                        Auth App
                    </h1>
                </Link>
            </div>
        </div>
    );
}

export default Header;
