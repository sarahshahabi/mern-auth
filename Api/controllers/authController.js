import User from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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

export async function signinUser(req, res) {
    const { email, password } = req.body;
    if (email && password) {
        try {
            const user = await User.findOne({ email });
            if (user) {
                const matchedPassword = await bcryptjs.compare(password, user.password);
                if (matchedPassword) {
                    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
                    user.password = undefined;
                    const expiryDate = new Date(Date.now() + 3600000);
                    res.cookie("access-token", token, { httpOnly: true, expires: expiryDate })
                        .status(200)
                        .success("User signed in successfully", user, 200);
                } else {
                    res.fail("Username or Password isn't correct");
                }
            } else {
                res.fail("User not found", 404);
            }
        } catch (e) {
            res.fail(e.message, 500);
        }
    } else {
        res.fail("Please Provilde username and password", 409);
    }
}

export async function signInOrUpWithGoogle(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
            const { password: hashedPassword, ...rest } = user._doc;
            const expiryDate = new Date(Date.now() + 3600000);
            res.cookie("access-token", token, { httpOnly: true, expires: expiryDate })
                .status(200)
                .success("User signed in successfully With google", rest, 200);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = await bcryptjs.hash(generatedPassword, 10);
            const newUser = new User({
                username:
                    req.body.name.split(" ").join("").toLowerCase() +
                    Math.floor(Math.random() * 1000).toString(),
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
            newUser.password = undefined;
            const expiryDate = new Date(Date.now() + 3600000);
            res.cookie("access-token", token, { httpOnly: true, expires: expiryDate })
                .status(200)
                .success("User signed up successfully with google", newUser, 200);
        }
    } catch (e) {
        res.fail("There is a internall Error");
    }
}
