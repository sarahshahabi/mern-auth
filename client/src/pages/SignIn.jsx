import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../stores/slices/userSlice";
import OAuth from "../components/OAuth";

function SignIn() {
    const [formData, setFormData] = useState({});
    const [successMessage, setSuccessMessage] = useState(false);

    const isLoading = useSelector((state) => state.user.isLoading);
    let error = useSelector((state) => state.user.error);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        (document.title = "Sign In"), dispatch(userActions.setError(false));
    }, []);

    function handleChangeInput(e) {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        dispatch(userActions.setError(false));
        dispatch(userActions.setIsLoading(true));
        const result = await signin(formData);
        if (result.success) {
            setSuccessMessage(result.message);
            dispatch(userActions.setUser(result.body));
            setTimeout(() => navigate("/"), 2000);
        } else {
            dispatch(userActions.setError(result.message));
        }
        dispatch(userActions.setIsLoading(false));
    }

    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>

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
                    {isLoading ? "Is Loading..." : "Sign In"}
                </button>
                <OAuth />
            </form>

            <div className="flex gap-2">
                <p>Don't Have an account?</p>
                <Link to={"/sign-up"}>
                    <span className="font-bold cursor-pointer text-blue-400">Sign up</span>
                </Link>
            </div>
        </div>
    );
}

export default SignIn;
