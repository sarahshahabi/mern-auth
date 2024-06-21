import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase.js";
import SignIn from "./SignIn";
import { deleteAccount, updateUserById } from "../utils/api";
import { userActions } from "../stores/slices/userSlice.js";

function Profile() {
    const currentUser = useSelector((state) => state.user.user);

    const [image, setImage] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [formData, setFormData] = useState({});
    const [successMessage, setSuccessmessage] = useState("");

    const isLoading = useSelector((state) => state.user.isLoading);
    let error = useSelector((state) => state.user.error);

    const fileRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser === null) {
            navigate("/");
        }
        document.title = "Profile page";
    }, []);

    useEffect(() => {
        if (image) {
            handleFileUpload(image);
        }
    }, [image]);

    async function handleFileUpload(image) {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            "state_changed",
            (snapshop) => {
                const progress = (snapshop.bytesTransferred / snapshop.totalBytes) * 100;
                setImagePercent(Math.round(progress));
            },
            (error) => {
                setImageError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
                    setFormData({ ...formData, profilePicture: downloadURL })
                );
            }
        );
    }

    function handleChangeInput(e) {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        dispatch(userActions.setUpdateUserStart());
        try {
            const result = await updateUserById(currentUser._id, formData);
            console.log(result)
            if (result.success) {
                dispatch(userActions.setUpdatedUser(result.body));
                setSuccessmessage("Your account has updated successfully");
            } else {
                dispatch(userActions.setUserUpdatedError(result.message));
                setTimeout(() => {
                    dispatch(userActions.setUserUpdatedError(""));
                }, 3000);
            }
        } catch (e) {
            console.log("there is error");
        }
    }

    async function handleDeleteAccount() {
        dispatch(userActions.setDeleteUserStart(true));
        const result = await deleteAccount(currentUser._id);
        console.log(result)
        if (result.success) {
            dispatch(userActions.deletedUserSuuccess(result));
        } else {
            dispatch(userActions.setUserDeletedError(result));
        }
        dispatch(userActions.setDeleteUserStart(false));
    }

    if (currentUser === null) {
        return <SignIn />;
    } else {
        return (
            <div className="flex flex-col items-center max-w-4xl mx-auto">
                <h1 className="text-4xl font-semibold text-center my-12">Profile</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96 p-0">
                    <input
                        type="file"
                        ref={fileRef}
                        hidden
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <img
                        src={formData.profilePicture || currentUser.profilePicture}
                        alt="profile"
                        className="w-20 h-20 object-cover rounded-full self-center cursor-pointer"
                        onClick={() => fileRef.current.click()}
                    />

                    <p className="text-center font-semibold text-sm">
                        {imageError ? (
                            <span className="text-red-700">Error Uploading Image</span>
                        ) : imagePercent > 0 && imagePercent < 100 ? (
                            <span className="text-orange-400">{`Uploading: ${imagePercent}%`}</span>
                        ) : imagePercent === 100 ? (
                            <span className="text-green-600">Image uploaded successfully</span>
                        ) : (
                            ""
                        )}
                    </p>

                    <input
                        type="text"
                        placeholder="Username"
                        id="username"
                        name="username"
                        className="bg-slate-100 p-3 rounded-lg"
                        onChange={handleChangeInput}
                        defaultValue={currentUser.username}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        name="email"
                        className="bg-slate-100 p-3 rounded-lg"
                        onChange={handleChangeInput}
                        defaultValue={currentUser.email}
                        autoComplete="email"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        className="bg-slate-100 p-3 rounded-lg"
                        onChange={handleChangeInput}
                    />

                    <button
                        type="submit"
                        className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 cursor-pointer disabled:opacity-80"
                    >
                        {isLoading ? "Is Loading..." : "Update"}
                    </button>
                </form>

                <div className="my-6 flex justify-between w-96 p-0 m-0 text-red-700 cursor-pointer">
                    <span onClick={handleDeleteAccount}>Delete account</span>
                    <span>Sign out</span>
                </div>

                <p className="text-red-600 font-bold  ">{error && error}</p>
                <p className="text-green-600  ">{successMessage && successMessage}</p>
            </div>
        );
    }
}

export default Profile;
