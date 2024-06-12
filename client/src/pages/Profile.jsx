import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";

function Profile() {
    const currentUser = useSelector((state) => state.user.user);

    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [formData, setFormData] = useState({});
    const fileRef = useRef(null);
    const navigate = useNavigate();
    console.log(currentUser)

    useEffect(() => {
        if (currentUser === null) {
            navigate("/sign-in");
        }
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

    return (
        <div className="flex flex-col items-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-semibold text-center my-12">Profile</h1>

            <form className="flex flex-col gap-4 w-96 p-0">
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
                    className="bg-slate-100 p-3 rounded-lg"
                    value={currentUser.username}
                />

                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    className="bg-slate-100 p-3 rounded-lg"
                    value={currentUser.email}
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
