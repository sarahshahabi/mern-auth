import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log(req.cookies)
    if (!token) {
        res.fail("You are not authenticated!", 401);
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            res.fail("Token is not valid", 403);
        }
        req.user = user;
        next()
    });
    
};
