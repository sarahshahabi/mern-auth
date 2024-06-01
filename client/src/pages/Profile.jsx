import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Profile() {
    const currentUser = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (currentUser === null) {
            navigate("/sign-in");
        }
    }, []);

    return (
        <div className="flex flex-col items-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-semibold text-center my-12">Profile</h1>

            <form className="flex flex-col gap-4 p-3 w-96 p-0">
                <img
                    src={currentUser.body.profilePicture}
                    className="w-20 h-20 object-cover rounded-full self-center   "
                    alt="profile-image"
                />

                <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    className="bg-slate-100 p-3 rounded-lg"
                    value={currentUser.body.username}
                />

                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    className="bg-slate-100 p-3 rounded-lg"
                    value={currentUser.body.email}
                />

                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="bg-slate-100 p-3 rounded-lg"
                />

                <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 cursor-pointer disabled:opacity-80">
                    {isLoading ? "Is Loading..." : "Update"}
                </button>
            </form>

            <div className="my-6 flex justify-between w-96 p-0 m-0 text-red-700 cursor-pointer">
                <span>Delete account</span>
                <span>Sign up</span>
            </div>
        </div>
    );
}

export default Profile;
