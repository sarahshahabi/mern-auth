import { Link } from "react-router-dom";

function SignUp() {
    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Sign up</h1>

            <form className="flex flex-col gap-4 p-3">
                <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    className="bg-slate-100 p-3 rounded-lg "
                />
                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    className="bg-slate-100 p-3 rounded-lg "
                />
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="bg-slate-100 p-3 rounded-lg "
                />

                <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 cursor-pointer disabled:opacity-80">
                    Sign up
                </button>
            </form>

            <div className="flex gap-2">
                <p>Have and account?</p>
                <Link to={"/sign-in"}>
                    <span className="font-bold cursor-pointer text-blue-400">
                        Sign in
                    </span>
                </Link>
            </div>
        </div>
    );
}

export default SignUp;
