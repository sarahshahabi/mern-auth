import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { signInOrUpWithGoogle } from "../utils/api";
import {useDispatch} from "react-redux"
import { userActions } from "../stores/slices/userSlice.js";
import { useNavigate } from "react-router";

function OAuth() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    async function handleGoogleClick() {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const userData = await signInOrUpWithGoogle({
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
            });
            dispatch(userActions.setUser(userData))
            navigate("/")
            
        } catch (e) {
            console.log("Could not login with google", e.message);
        }
    }

    return (
        <button
            type="button"
            onClick={handleGoogleClick}
            className="text-white bg-red-700 rounded-lg uppercase hover:opacity-95 cursor-pointer p-3"
        >
            Continue with google
        </button>
    );
}

export default OAuth;
