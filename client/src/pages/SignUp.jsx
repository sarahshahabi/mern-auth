import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signup from "../utils/api";

function SignUp() {
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const navigate = useNavigate();

    function handleChangeInput(e) {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(false);
        setIsLoading(true);
        const result = await signup(formData);
        console.log(result)
        if (result.success) {
            setSuccessMessage(result.message);
            setError(false)
            setTimeout(() => navigate("/sign-in"), 2000);
        } else {
            setError(result.message);
        }
        setIsLoading(false);
    }

    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Sign up</h1>

            {successMessage && (
                <div className="text-green-600  ">
                    <h5>{successMessage}</h5>
                </div>
            )}
            {error && (
                <div className="text-red-600  ">
                    <h5>{error}</h5>
                </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-3">
                <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    className="bg-slate-100 p-3 rounded-lg"
                    onChange={handleChangeInput}
                />
                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    className="bg-slate-100 p-3 rounded-lg"
                    onChange={handleChangeInput}
                />
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="bg-slate-100 p-3 rounded-lg"
                    onChange={handleChangeInput}
                />

                <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 cursor-pointer disabled:opacity-80">
                    {isLoading ? "Is Loading..." : "SignUp"}
                </button>
            </form>

            <div className="flex gap-2">
                <p>Have and account?</p>
                <Link to={"/sign-in"}>
                    <span className="font-bold cursor-pointer text-blue-400">Sign in</span>
                </Link>
            </div>
        </div>
    );
}

export default SignUp;
