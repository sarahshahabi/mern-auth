import bcryptjs from "bcryptjs";
import User from "../models/userSchema.js";

export const testRoute = (req, res) => {
    res.json({
        message: "Api is working",
    });
};

export async function updateUser(req, res, next) {
    if (req.user.id !== req.params.id) {
        res.fail("No permission do this,You can update only your account", 401);
    }

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

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

export async function deleteUser(req, res) {
    if (req.user.id !== req.params.id) {
        res.fail("You can delete only your account", 401);
    }

    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            res.success("کاربر با موفقیت حذف شد");
        } else {
            res.fail("کاربر یافت نشد", 404 );
        }
    } catch (e) {
        res.fail("مشکلی در اجرای درخواست پیش امده", 500);
    }
}
