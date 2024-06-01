import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Profile() {
    const currentUser = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (!currentUser) {
            navigate("/sign-in");
        }
    }, []);
  
  
    return <div>Profile</div>;
}

export default Profile;
