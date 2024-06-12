import bcryptjs from "bcryptjs";
import User from "../models/userSchema.js";

export const testRoute = (req, res) => {
    res.json({
        message: "Api is working",
    });
};

export async function updateUser(req, res) {
    if (req.user.id !== req.params.id) {
        res.fail("No permission do this,You can update only your account", 401);
    }

    if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                },
            },
            { new: true }
        );
        updateUser.password = undefined;
        res.success("User updated successfully", updatedUser, 200);
    } catch (e) {
        res.fail("Internal Error", 500);
    }
}
