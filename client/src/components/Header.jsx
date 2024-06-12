import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Header() {
    const  currentUser  = useSelector((state) => state.user.user);
    console.log(currentUser)
    return (
        <div className="bg-slate-200">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3 ">
                <ul className="flex justify-between items-center  gap-5">
                    <Link to={"/"}>
                        <li>Home</li>
                    </Link>

                    <Link to={"/about"}>
                        <li>About us</li>
                    </Link>  

                    {currentUser ? <Link to={"/profile"}><img src={currentUser.profilePicture} alt="user-Profile" className="w-10 h-10 rounded-full object-cover "/></Link> : <Link to={"/sign-in"}><li>Sign in</li></Link>}

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
