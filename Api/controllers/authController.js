import User from "../models/userSchema.js";
import bcryptjs from "bcryptjs";

export async function signupUser(req, res) {
    const { username, email, password } = req.body;
    if (username && password && email) {
        try {
            const user = await User.findOne({ username });
            if (user) {
                return res.fail("There is a user with same username, try another username", 409);
            } else {
                const hashedPassword = await bcryptjs.hash(password, 10);
                await User.create({
                    username,
                    email,
                    password: hashedPassword,
                });
                const body = await User.findOne({ username });
                res.success("User Created Successfully", body, 201);
            }
        } catch (e) {
            res.fail(e.message, 500);
        }
    } else {
        res.fail("Provide all required fields, please", 404);
    }
}
